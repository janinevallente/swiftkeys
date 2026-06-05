"use client";

import { useRef, useState, useLayoutEffect } from "react";
import type { ScoreEntry } from "@/hooks/useScoreHistory";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from "recharts";

export default function WpmChart({ history }: { history: ScoreEntry[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  // Measure the wrapper's real pixel dimensions before rendering the chart.
  // useLayoutEffect runs synchronously after DOM paint so we always get
  // a positive value — ResizeObserver keeps it accurate on resize too.
  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observe = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setSize({ width, height });
      }
    };

    observe(); // measure immediately

    const ro = new ResizeObserver(observe);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rawData = [...history].reverse().slice(-10);
  if (rawData.length === 0) return null;

  const maxWpm = Math.max(...rawData.map((e) => e.wpm));
  const data = rawData.map((entry, i) => ({
    ...entry,
    indexNumber: history.length - rawData.length + i + 1,
    isBest: entry.wpm === maxWpm,
  }));

  return (
    <div ref={wrapperRef} className="w-full h-[180px] mt-2 min-w-0">
      {/* Only render the chart once we have confirmed positive dimensions */}
      {size && (
        <BarChart
          width={size.width}
          height={size.height}
          data={data}
          margin={{ top: 24, right: 12, left: -8, bottom: 0 }}
          barGap={0}
        >
          <CartesianGrid
            strokeDasharray="2 2"
            stroke="var(--border-strong)"
            vertical={false}
          />
          <XAxis
            dataKey="indexNumber"
            tickLine={false}
            axisLine={{ stroke: "var(--border-strong)", strokeWidth: 1 }}
            tick={{ fontFamily: "'VT323', monospace", fontSize: 14, fill: "var(--text-muted)" }}
            dy={6}
          />
          <YAxis
            tickLine={false}
            axisLine={{ stroke: "var(--border-strong)", strokeWidth: 1 }}
            tick={{ fontFamily: "'VT323', monospace", fontSize: 14, fill: "var(--text-muted)" }}
            allowDecimals={false}
            width={36}
          />
          <Bar
            dataKey="wpm"
            maxBarSize={28}
            shape={(props: any) => {
              const { x, y, width, height, payload } = props;
              const fill = payload?.isBest ? "var(--amber)" : "var(--default)";
              return (
                <g>
                  <rect
                    x={x + 2} y={y + 2}
                    width={width} height={height}
                    fill="var(--default-dim)" opacity="0.3"
                  />
                  <rect x={x} y={y} width={width} height={height} fill={fill} />
                </g>
              );
            }}
          >
            <LabelList
              dataKey="wpm"
              position="top"
              content={(props) => {
                const { x, y, width, value, index } = props;
                if (
                  index === undefined ||
                  x === undefined ||
                  y === undefined ||
                  width === undefined
                ) return null;
                const isBest = data[index]?.isBest;
                return (
                  <text
                    x={Number(x) + Number(width) / 2}
                    y={Number(y) - 5}
                    fill={isBest ? "var(--amber)" : "var(--text-secondary)"}
                    textAnchor="middle"
                    style={{ fontFamily: "'VT323', monospace", fontSize: "15px" }}
                  >
                    {value}
                  </text>
                );
              }}
            />
          </Bar>
        </BarChart>
      )}
    </div>
  );
}