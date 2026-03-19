import React, { useRef, useEffect, useCallback } from 'react';
import { WF_NODES, WF_EDGES } from '../data';
import './LiveWorkflow.css';

const NODE_W = 170;
const NODE_H = 56;
const ORB_COUNT = 10;
const ORB_SPEED = 1.5;

const ORB_COLORS = [
  '#e8571a',
  '#a78bfa',
  '#4ade80',
  '#60a5fa',
  '#fbbf24',
  '#f472b6',
  '#2dd4bf',
  '#f97316',
  '#c084fc',
  '#34d399',
];

const CHAIN = [
  'n0',
  'n1',
  'n2',
  'n3',
  'n4',
  'n5',
  'n6',
  'n8',
  'n10',
  'n11',
  'n12',
  'n13',
  'n14',
  'n15',
  'n16',
  'n17',
];

function getNode(id) {
  return WF_NODES.find((n) => n.id === id);
}

function centerOf(node) {
  return {
    x: node.x,
    y: node.y,
  };
}

function edgeEndpoints(aId, bId) {
  const A = getNode(aId);
  const B = getNode(bId);
  if (!A || !B) return null;

  const aC = centerOf(A);
  const bC = centerOf(B);

  const dx = bC.x - aC.x;
  const dy = bC.y - aC.y;

  if (Math.abs(dy) > Math.abs(dx)) {
    const goingDown = dy > 0;

    return {
      fx: aC.x,
      fy: aC.y + (goingDown ? NODE_H / 2 : -NODE_H / 2),
      tx: bC.x,
      ty: bC.y + (goingDown ? -NODE_H / 2 : NODE_H / 2),
      isVert: true,
    };
  }

  const goingRight = dx > 0;

  return {
    fx: aC.x + (goingRight ? NODE_W / 2 : -NODE_W / 2),
    fy: aC.y,
    tx: bC.x + (goingRight ? -NODE_W / 2 : NODE_W / 2),
    ty: bC.y,
    isVert: false,
  };
}

function pushOrthogonal(pts, toX, toY) {
  const last = pts[pts.length - 1];

  if (!last) {
    pts.push({ x: toX, y: toY });
    return;
  }

  const dx = Math.abs(toX - last.x);
  const dy = Math.abs(toY - last.y);

  if (dx < 0.5 && dy < 0.5) return;

  if (dx >= 0.5) pts.push({ x: toX, y: last.y });
  if (dy >= 0.5) pts.push({ x: toX, y: toY });
}

function dedupePoints(points) {
  const out = [];

  for (const p of points) {
    const last = out[out.length - 1];
    if (!last || Math.abs(last.x - p.x) > 0.5 || Math.abs(last.y - p.y) > 0.5) {
      out.push(p);
    }
  }

  return out;
}

function buildWaypoints() {
  const pts = [];
  if (CHAIN.length < 2) return pts;

  const firstEdge = edgeEndpoints(CHAIN[0], CHAIN[1]);
  if (!firstEdge) return pts;

  pts.push({ x: firstEdge.fx, y: firstEdge.fy });

  for (let i = 0; i < CHAIN.length - 1; i += 1) {
    const aId = CHAIN[i];
    const bId = CHAIN[i + 1];
    const A = getNode(aId);
    const B = getNode(bId);
    const edge = edgeEndpoints(aId, bId);

    if (!A || !B || !edge) continue;

    const { fx, fy, tx, ty, isVert } = edge;

    if (i > 0) {
      const aCenter = centerOf(A);
      pushOrthogonal(pts, aCenter.x, aCenter.y);
      pushOrthogonal(pts, fx, fy);
    }

    if (isVert || Math.abs(fy - ty) < 0.5) {
      pushOrthogonal(pts, tx, ty);
    } else {
      const midX = fx + (tx - fx) / 2;
      pushOrthogonal(pts, midX, fy);
      pushOrthogonal(pts, midX, ty);
      pushOrthogonal(pts, tx, ty);
    }

    if (i === CHAIN.length - 2) break;
  }

  return dedupePoints(pts);
}

function buildMetrics(points) {
  const cum = [0];

  for (let i = 1; i < points.length; i += 1) {
    cum.push(
      cum[i - 1] +
        Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y)
    );
  }

  return {
    points,
    cum,
    total: cum[cum.length - 1] || 0,
  };
}

function posAt(metrics, d) {
  const { points, cum, total } = metrics;

  if (!points.length) return { x: 0, y: 0 };
  if (points.length === 1 || total <= 0) return points[0];

  const dist = Math.max(0, Math.min(total, d));

  let lo = 0;
  let hi = points.length - 2;

  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (cum[mid + 1] < dist) lo = mid + 1;
    else hi = mid;
  }

  const segLen = cum[lo + 1] - cum[lo];
  const t = segLen > 0 ? (dist - cum[lo]) / segLen : 0;

  return {
    x: points[lo].x + (points[lo + 1].x - points[lo].x) * t,
    y: points[lo].y + (points[lo + 1].y - points[lo].y) * t,
  };
}

function buildEdgeWaypoints(aId, bId) {
  const edge = edgeEndpoints(aId, bId);
  if (!edge) return [];

  const { fx, fy, tx, ty, isVert } = edge;
  const pts = [{ x: fx, y: fy }];

  if (isVert || Math.abs(fy - ty) < 0.5) {
    pushOrthogonal(pts, tx, ty);
  } else {
    const midX = fx + (tx - fx) / 2;
    pushOrthogonal(pts, midX, fy);
    pushOrthogonal(pts, midX, ty);
    pushOrthogonal(pts, tx, ty);
  }

  return dedupePoints(pts);
}

function buildEdgePaths() {
  const map = {};

  WF_EDGES.forEach(([aId, bId]) => {
    const edge = edgeEndpoints(aId, bId);
    if (!edge) return;

    const { fx, fy, tx, ty, isVert } = edge;
    let d = '';

    if (isVert) {
      d = `M${fx},${fy} V${ty}`;
    } else if (Math.abs(fy - ty) < 0.5) {
      d = `M${fx},${fy} H${tx}`;
    } else {
      const midX = fx + (tx - fx) / 2;
      d = `M${fx},${fy} H${midX} V${ty} H${tx}`;
    }

    map[`${aId}-${bId}`] = d;
  });

  return map;
}

function buildHoverMetrics(prevId, hoveredId, nextId) {
  return {
    prevToCurrent: prevId ? buildMetrics(buildEdgeWaypoints(prevId, hoveredId)) : null,
    currentToNext: nextId ? buildMetrics(buildEdgeWaypoints(hoveredId, nextId)) : null,
  };
}

const MAIN_METRICS = buildMetrics(buildWaypoints());
const EDGE_PATHS = buildEdgePaths();

export default function LiveWorkflow() {
  const containerRef = useRef(null);
  const nodeLayerRef = useRef(null);
  const orbLayerRef = useRef(null);
  const svgRef = useRef(null);

  const nodeElsRef = useRef({});
  const pathElsRef = useRef({});

  const stateRef = useRef({
    tx: 60,
    ty: -30,
    scale: 0.46,

    dragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragTx: 0,
    dragTy: 0,

    phase: 0,
    hoverPhase: 0,
    raf: null,

    hoveredId: null,
    hoverMetrics: null,

    baseOrbs: [],
    hoverOrbPrev: null,
    hoverOrbNext: null,
  });

  const applyTransform = useCallback(() => {
    const s = stateRef.current;
    const t = `translate(${s.tx}px, ${s.ty}px) scale(${s.scale})`;

    if (nodeLayerRef.current) nodeLayerRef.current.style.transform = t;
    if (orbLayerRef.current) orbLayerRef.current.style.transform = t;
  }, []);

  const onNodeEnter = useCallback((id) => {
    const s = stateRef.current;
    s.hoveredId = id;
    s.hoverPhase = 0;

    const idx = CHAIN.indexOf(id);
    const prevId = idx > 0 ? CHAIN[idx - 1] : null;
    const nextId = idx >= 0 && idx < CHAIN.length - 1 ? CHAIN[idx + 1] : null;

    s.hoverMetrics = buildHoverMetrics(prevId, id, nextId);

    const keep = new Set([id]);
    if (prevId) keep.add(prevId);
    if (nextId) keep.add(nextId);

    Object.entries(nodeElsRef.current).forEach(([nid, el]) => {
      el.classList.toggle('wf-node--dimmed', !keep.has(nid));
      el.classList.toggle('wf-node--highlighted', nid === id);
      el.classList.toggle('wf-node--active-neighbour', nid !== id && keep.has(nid));
    });

    Object.entries(pathElsRef.current).forEach(([key, p]) => {
      const sep = key.indexOf('-', 1);
      const a = key.slice(0, sep);
      const b = key.slice(sep + 1);

      const active =
        (prevId && a === prevId && b === id) ||
        (nextId && a === id && b === nextId);

      p.setAttribute('stroke', active ? 'hsl(0,0%,78%)' : 'hsl(0,0%,18%)');
      p.setAttribute('opacity', active ? '1' : '0.12');
    });
  }, []);

  const onNodeLeave = useCallback(() => {
    const s = stateRef.current;
    s.hoveredId = null;
    s.hoverMetrics = null;
    s.hoverPhase = 0;

    Object.values(nodeElsRef.current).forEach((el) => {
      el.classList.remove(
        'wf-node--dimmed',
        'wf-node--highlighted',
        'wf-node--active-neighbour'
      );
    });

    Object.values(pathElsRef.current).forEach((p) => {
      p.setAttribute('stroke', 'hsl(0,0%,40%)');
      p.setAttribute('opacity', '0.8');
    });

    if (s.hoverOrbPrev) s.hoverOrbPrev.style.opacity = '0';
    if (s.hoverOrbNext) s.hoverOrbNext.style.opacity = '0';
  }, []);

  const onMouseDown = useCallback((e) => {
    if (e.target.closest('.wf-zoom-btn')) return;

    const s = stateRef.current;
    s.dragging = true;
    s.dragStartX = e.clientX;
    s.dragStartY = e.clientY;
    s.dragTx = s.tx;
    s.dragTy = s.ty;

    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
    e.preventDefault();
  }, []);

  const onWheel = useCallback(
    (e) => {
      e.preventDefault();

      const s = stateRef.current;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(0.15, Math.min(3, s.scale * delta));

      s.tx = mx - (mx - s.tx) * (newScale / s.scale);
      s.ty = my - (my - s.ty) * (newScale / s.scale);
      s.scale = newScale;

      applyTransform();
    },
    [applyTransform]
  );

  useEffect(() => {
    const nodeLayer = nodeLayerRef.current;
    const orbLayer = orbLayerRef.current;
    const svg = svgRef.current;
    const state = stateRef.current;

    if (!nodeLayer || !orbLayer || !svg) return undefined;

    const localNodeEls = {};
    const localPathEls = {};
    const localBaseOrbs = [];

    Object.entries(EDGE_PATHS).forEach(([key, d]) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'hsl(0,0%,40%)');
      path.setAttribute('stroke-width', '1.5');
      path.setAttribute('opacity', '0.8');
      path.setAttribute('d', d);
      path.classList.add('wf-edge-path');

      svg.appendChild(path);
      localPathEls[key] = path;
    });

    pathElsRef.current = localPathEls;

    WF_NODES.forEach((n) => {
      const el = document.createElement('div');
      el.className = 'wf-node-card';
      el.style.cssText = `
        left:${n.x}px;
        top:${n.y}px;
        background:${n.bg};
        border-color:${n.border};
      `;
      el.innerHTML = `
        <span class="wf-node-emoji">${n.emoji}</span>
        <div class="wf-node-info">
          <p class="wf-node-title" style="color:${n.color}">${n.title}</p>
          <p class="wf-node-sub">${n.sub}</p>
        </div>
      `;

      const handleEnter = () => onNodeEnter(n.id);
      const handleLeave = () => onNodeLeave();

      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);

      localNodeEls[n.id] = {
        el,
        handleEnter,
        handleLeave,
      };

      nodeLayer.appendChild(el);
    });

    nodeElsRef.current = Object.fromEntries(
      Object.entries(localNodeEls).map(([id, value]) => [id, value.el])
    );

    for (let i = 0; i < ORB_COUNT; i += 1) {
      const color = ORB_COLORS[i % ORB_COLORS.length];
      const orbEl = document.createElement('div');
      orbEl.className = 'wf-orb';
      orbEl.style.cssText = `background:${color};box-shadow:0 0 8px 3px ${color};opacity:0;`;
      orbLayer.appendChild(orbEl);
      localBaseOrbs.push(orbEl);
    }

    const hoverOrbPrev = document.createElement('div');
    hoverOrbPrev.className = 'wf-orb wf-orb--focus';
    hoverOrbPrev.style.cssText =
      'background:#ffffff;box-shadow:0 0 10px 3px rgba(255,255,255,0.9);opacity:0;';
    orbLayer.appendChild(hoverOrbPrev);

    const hoverOrbNext = document.createElement('div');
    hoverOrbNext.className = 'wf-orb wf-orb--focus';
    hoverOrbNext.style.cssText =
      'background:#ffffff;box-shadow:0 0 10px 3px rgba(255,255,255,0.9);opacity:0;';
    orbLayer.appendChild(hoverOrbNext);

    state.baseOrbs = localBaseOrbs;
    state.hoverOrbPrev = hoverOrbPrev;
    state.hoverOrbNext = hoverOrbNext;

    applyTransform();

    const spacing = MAIN_METRICS.total / Math.max(ORB_COUNT - 1, 1);
    const maxPhase = MAIN_METRICS.total + spacing * (ORB_COUNT - 1);

    let rafId = null;

    const loop = () => {
      const s = stateRef.current;

      if (!s.hoveredId) {
        s.phase += ORB_SPEED;
        if (s.phase > maxPhase) s.phase = 0;

        localBaseOrbs.forEach((orbEl, i) => {
          const dist = s.phase - i * spacing;

          if (dist < 0 || dist > MAIN_METRICS.total) {
            orbEl.style.opacity = '0';
            return;
          }

          const pos = posAt(MAIN_METRICS, dist);
          orbEl.style.opacity = '1';
          orbEl.style.left = `${pos.x}px`;
          orbEl.style.top = `${pos.y}px`;
        });

        hoverOrbPrev.style.opacity = '0';
        hoverOrbNext.style.opacity = '0';
      } else {
        localBaseOrbs.forEach((orbEl) => {
          orbEl.style.opacity = '0';
        });

        s.hoverPhase += ORB_SPEED * 1.2;
        const hover = s.hoverMetrics;

        if (hover?.prevToCurrent && hover.prevToCurrent.total > 0) {
          const d = s.hoverPhase % hover.prevToCurrent.total;
          const pos = posAt(hover.prevToCurrent, d);
          hoverOrbPrev.style.opacity = '1';
          hoverOrbPrev.style.left = `${pos.x}px`;
          hoverOrbPrev.style.top = `${pos.y}px`;
        } else {
          hoverOrbPrev.style.opacity = '0';
        }

        if (hover?.currentToNext && hover.currentToNext.total > 0) {
          const d = s.hoverPhase % hover.currentToNext.total;
          const pos = posAt(hover.currentToNext, d);
          hoverOrbNext.style.opacity = '1';
          hoverOrbNext.style.left = `${pos.x}px`;
          hoverOrbNext.style.top = `${pos.y}px`;
        } else {
          hoverOrbNext.style.opacity = '0';
        }
      }

      rafId = requestAnimationFrame(loop);
      stateRef.current.raf = rafId;
    };

    rafId = requestAnimationFrame(loop);
    state.raf = rafId;

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      Object.values(localNodeEls).forEach(({ el, handleEnter, handleLeave }) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);

        if (el.parentNode === nodeLayer) {
          nodeLayer.removeChild(el);
        }
      });

      Object.values(localPathEls).forEach((path) => {
        if (path.parentNode === svg) {
          svg.removeChild(path);
        }
      });

      localBaseOrbs.forEach((orbEl) => {
        if (orbEl.parentNode === orbLayer) {
          orbLayer.removeChild(orbEl);
        }
      });

      if (hoverOrbPrev.parentNode === orbLayer) {
        orbLayer.removeChild(hoverOrbPrev);
      }

      if (hoverOrbNext.parentNode === orbLayer) {
        orbLayer.removeChild(hoverOrbNext);
      }

      nodeElsRef.current = {};
      pathElsRef.current = {};

      state.baseOrbs = [];
      state.hoverOrbPrev = null;
      state.hoverOrbNext = null;
      state.raf = null;
    };
  }, [applyTransform, onNodeEnter, onNodeLeave]);

  useEffect(() => {
    const onMove = (e) => {
      const s = stateRef.current;
      if (!s.dragging) return;

      s.tx = s.dragTx + (e.clientX - s.dragStartX);
      s.ty = s.dragTy + (e.clientY - s.dragStartY);
      applyTransform();
    };

    const onUp = () => {
      stateRef.current.dragging = false;
      if (containerRef.current) containerRef.current.style.cursor = 'grab';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [applyTransform]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, [onWheel]);

  const zoom = (dir) => {
    const s = stateRef.current;
    s.scale = Math.max(0.15, Math.min(3, s.scale * (dir > 0 ? 1.2 : 0.8)));
    applyTransform();
  };

  const reset = () => {
    const s = stateRef.current;
    s.tx = 60;
    s.ty = -30;
    s.scale = 0.46;
    applyTransform();
  };

  return (
    <div className="live-workflow" ref={containerRef} onMouseDown={onMouseDown}>
      <svg className="wf-grid" aria-hidden="true">
        <defs>
          <pattern id="wfgrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path
              d="M 30 0 L 0 0 0 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wfgrid)" />
      </svg>

      <div className="wf-label">
        <span>Live Workflow</span>
        <span className="wf-live-dot" aria-hidden="true" />
      </div>

      <div className="wf-zoom-controls">
        <button className="wf-zoom-btn" onClick={() => zoom(1)} aria-label="Zoom in">
          +
        </button>
        <button className="wf-zoom-btn" onClick={() => zoom(-1)} aria-label="Zoom out">
          −
        </button>
        <button
          className="wf-zoom-btn wf-zoom-btn--reset"
          onClick={reset}
          aria-label="Reset view"
        >
          ⟳
        </button>
      </div>

      <div className="wf-canvas-wrap">
        <div className="wf-transform-layer wf-orb-layer" ref={orbLayerRef}>
          <svg
            ref={svgRef}
            width="2000"
            height="2000"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              overflow: 'visible',
              pointerEvents: 'none',
            }}
          />
        </div>

        <div className="wf-transform-layer wf-node-layer" ref={nodeLayerRef} />
      </div>
    </div>
  );
}