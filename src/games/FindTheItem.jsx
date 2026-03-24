import React, { useState, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

// Items hidden in the scene with their center coordinates and find radius
const HIDDEN_ITEMS = [
  { id: 'star',      label: 'Star',       emoji: '★',  cx: 62,  cy: 108, r: 22, found: false },
  { id: 'key',       label: 'Key',        emoji: '⚿',  cx: 200, cy: 238, r: 20, found: false },
  { id: 'heart',     label: 'Heart',      emoji: '♥',  cx: 342, cy: 183, r: 20, found: false },
  { id: 'moon',      label: 'Moon',       emoji: '☽',  cx: 272, cy: 48,  r: 22, found: false },
  { id: 'butterfly', label: 'Butterfly',  emoji: '✿',  cx: 158, cy: 213, r: 20, found: false },
];

// SVG viewport size
const VW = 400;
const VH = 280;

const FindTheItem = ({ onBack, onComplete }) => {
  const [found, setFound] = useState(new Set());
  const [ripple, setRipple] = useState(null); // { x, y, hit: bool }
  const svgRef = useRef(null);

  const foundAll = found.size === HIDDEN_ITEMS.length;

  const handleSvgClick = (e) => {
    if (foundAll) return;
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const scaleX = VW / rect.width;
    const scaleY = VH / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    let hit = false;
    for (const item of HIDDEN_ITEMS) {
      if (found.has(item.id)) continue;
      const dist = Math.sqrt((x - item.cx) ** 2 + (y - item.cy) ** 2);
      if (dist <= item.r) {
        const next = new Set(found);
        next.add(item.id);
        setFound(next);
        hit = true;
        if (next.size === HIDDEN_ITEMS.length) {
          setTimeout(() => onComplete && onComplete(), 800);
        }
        break;
      }
    }

    setRipple({ x, y, hit });
    setTimeout(() => setRipple(null), 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-peace-50 to-lavender-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 pt-10 pb-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-xl active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-display font-bold text-gray-800">Find the Item</h1>
          <p className="text-sm text-gray-500 font-body">
            {found.size}/{HIDDEN_ITEMS.length} found — tap where you see each item
          </p>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        {foundAll ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <div className="text-7xl mb-6 animate-bounce-soft">🎉</div>
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-3">
              You found everything!
            </h2>
            <p className="text-gray-600 font-body text-lg mb-8">
              Sharp eyes — great mindful break!
            </p>
            <button
              onClick={onBack}
              className="px-8 py-4 bg-gradient-to-r from-sage-400 to-peace-400 text-white rounded-3xl font-display font-bold text-lg shadow-soft active:scale-95 transition-transform"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <>
            {/* Scene SVG */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-card mb-5 cursor-crosshair">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${VW} ${VH}`}
                className="w-full"
                onClick={handleSvgClick}
              >
                {/* Sky */}
                <rect x="0" y="0" width="400" height="195" fill="#87CEEB" />

                {/* Sun */}
                <circle cx="355" cy="42" r="28" fill="#FFD700" />
                {[0,45,90,135,180,225,270,315].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <line
                      key={angle}
                      x1={355 + 32 * Math.cos(rad)}
                      y1={42 + 32 * Math.sin(rad)}
                      x2={355 + 42 * Math.cos(rad)}
                      y2={42 + 42 * Math.sin(rad)}
                      stroke="#FFD700"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  );
                })}

                {/* Cloud 1 */}
                <ellipse cx="110" cy="60" rx="35" ry="20" fill="white" opacity="0.9" />
                <ellipse cx="135" cy="52" rx="28" ry="18" fill="white" opacity="0.9" />
                <ellipse cx="88" cy="55" rx="22" ry="16" fill="white" opacity="0.9" />

                {/* Cloud 2 (moon hidden inside) */}
                <ellipse cx="270" cy="52" rx="38" ry="22" fill="white" opacity="0.9" />
                <ellipse cx="295" cy="44" rx="30" ry="20" fill="white" opacity="0.9" />
                <ellipse cx="248" cy="48" rx="25" ry="17" fill="white" opacity="0.9" />

                {/* Ground */}
                <rect x="0" y="193" width="400" height="87" fill="#5D9E3E" />

                {/* Path */}
                <rect x="162" y="193" width="76" height="87" fill="#C8A86B" />
                <rect x="195" y="200" width="10" height="15" fill="#B8986A" opacity="0.5" />
                <rect x="195" y="230" width="10" height="15" fill="#B8986A" opacity="0.5" />
                <rect x="195" y="255" width="10" height="15" fill="#B8986A" opacity="0.5" />

                {/* Tree trunk */}
                <rect x="54" y="153" width="18" height="44" fill="#795548" />

                {/* Tree foliage (dark green) */}
                <circle cx="63" cy="135" r="48" fill="#388E3C" />
                <circle cx="63" cy="120" r="40" fill="#4CAF50" />
                <circle cx="78" cy="130" r="30" fill="#43A047" />
                <circle cx="48" cy="128" r="28" fill="#388E3C" />

                {/* Bench */}
                <rect x="173" y="208" width="54" height="7" rx="2" fill="#8D6E63" />
                <rect x="173" y="200" width="54" height="5" rx="2" fill="#795548" />
                <rect x="178" y="215" width="7" height="13" rx="1" fill="#6D4C41" />
                <rect x="215" y="215" width="7" height="13" rx="1" fill="#6D4C41" />

                {/* Flowers right side */}
                {[{x:310,y:195,fc:'#FF4081'},{x:332,y:192,fc:'#FF9800'},{x:352,y:194,fc:'#E91E63'}].map((f,i) => (
                  <g key={i}>
                    <line x1={f.x} y1={f.y} x2={f.x} y2="210" stroke="#4CAF50" strokeWidth="2" />
                    <ellipse cx={f.x-4} cy={f.y+5} rx="5" ry="3" fill="#4CAF50" transform={`rotate(-30,${f.x-4},${f.y+5})`} />
                    <circle cx={f.x} cy={f.y} r="8" fill={f.fc} />
                    <circle cx={f.x} cy={f.y} r="3" fill="#FFF9C4" />
                  </g>
                ))}

                {/* Bushes left */}
                <ellipse cx="18" cy="200" rx="22" ry="14" fill="#388E3C" />
                <ellipse cx="38" cy="197" rx="18" ry="12" fill="#43A047" />

                {/* Bushes right */}
                <ellipse cx="385" cy="200" rx="18" ry="12" fill="#43A047" />

                {/* --- HIDDEN ITEMS --- */}

                {/* 1. Star - in tree foliage */}
                <text
                  x="62" y="113"
                  fontSize="13"
                  fill={found.has('star') ? '#FFD700' : '#D4AC0D'}
                  textAnchor="middle"
                  opacity={found.has('star') ? 1 : 0.75}
                  style={{ userSelect: 'none' }}
                >
                  ★
                </text>

                {/* 2. Key - on path */}
                <text
                  x="200" y="243"
                  fontSize="12"
                  fill={found.has('key') ? '#B0BEC5' : '#9E8B6E'}
                  textAnchor="middle"
                  opacity={found.has('key') ? 1 : 0.7}
                  style={{ userSelect: 'none' }}
                >
                  ⚿
                </text>

                {/* 3. Heart - among flowers */}
                <text
                  x="342" y="188"
                  fontSize="11"
                  fill={found.has('heart') ? '#FF4081' : '#C2185B'}
                  textAnchor="middle"
                  opacity={found.has('heart') ? 1 : 0.72}
                  style={{ userSelect: 'none' }}
                >
                  ♥
                </text>

                {/* 4. Moon - in cloud */}
                <text
                  x="272" y="54"
                  fontSize="13"
                  fill={found.has('moon') ? '#BDBDBD' : '#EEEEEE'}
                  textAnchor="middle"
                  opacity={found.has('moon') ? 1 : 0.7}
                  style={{ userSelect: 'none' }}
                >
                  ☽
                </text>

                {/* 5. Butterfly - near bench */}
                <text
                  x="158" y="218"
                  fontSize="11"
                  fill={found.has('butterfly') ? '#7B1FA2' : '#5D6E4A'}
                  textAnchor="middle"
                  opacity={found.has('butterfly') ? 1 : 0.68}
                  style={{ userSelect: 'none' }}
                >
                  ✿
                </text>

                {/* Found item highlight rings */}
                {HIDDEN_ITEMS.filter(item => found.has(item.id)).map(item => (
                  <circle
                    key={item.id}
                    cx={item.cx}
                    cy={item.cy}
                    r={item.r + 4}
                    fill="none"
                    stroke="#8FBC8F"
                    strokeWidth="2"
                    opacity="0.8"
                  />
                ))}

                {/* Click ripple */}
                {ripple && (
                  <circle
                    cx={ripple.x}
                    cy={ripple.y}
                    r="18"
                    fill={ripple.hit ? 'rgba(143,188,143,0.4)' : 'rgba(255,150,100,0.3)'}
                    stroke={ripple.hit ? '#8FBC8F' : '#FF9B7A'}
                    strokeWidth="1.5"
                  />
                )}
              </svg>
            </div>

            {/* Item checklist */}
            <div className="bg-white rounded-3xl p-5 shadow-soft">
              <h3 className="font-display font-semibold text-gray-500 text-xs uppercase tracking-widest mb-4">
                Find these items
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {HIDDEN_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col items-center p-2 rounded-2xl transition-all ${
                      found.has(item.id)
                        ? 'bg-sage-100 opacity-60'
                        : 'bg-gray-50'
                    }`}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span
                      className={`text-xs font-body mt-1 text-center ${
                        found.has(item.id)
                          ? 'line-through text-sage-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FindTheItem;
