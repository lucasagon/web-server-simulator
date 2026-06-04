import { Handle, Position, type NodeProps } from 'reactflow'
import { componentCatalog } from '../data/catalog'
import { formatPercent } from '../utils/format'
import type { ArchitectureNodeData } from '../types'

interface NodeViewData extends ArchitectureNodeData {
  onQuickUpdate: (id: string, patch: Partial<ArchitectureNodeData>) => void
}

const statusStyles = {
  normal: 'border-ok shadow-[0_0_0_1px_rgba(34,197,94,0.2)]',
  alert: 'border-warn shadow-[0_0_0_1px_rgba(250,204,21,0.2)]',
  critical: 'border-danger shadow-[0_0_0_1px_rgba(239,68,68,0.2)]',
}

export function ComponentNode({ data, selected }: NodeProps<NodeViewData>) {
  const item = componentCatalog[data.type]
  const Icon = item.icon

  return (
    <div
      className={`w-[250px] rounded-lg border bg-slate-950/95 p-3 text-slate-100 ${statusStyles[data.status]} ${
        selected ? 'ring-2 ring-sky-400/60' : ''
      }`}
    >
      <Handle type="target" position={Position.Left} className="!border-0 !bg-sky-400" />
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-border bg-slate-900 p-2 text-sky-300">
            <Icon size={16} />
          </span>
          <div>
            <div className="text-sm font-semibold">{data.name}</div>
            <div className="text-[11px] uppercase tracking-wide text-slate-500">{item.label}</div>
          </div>
        </div>
        <div className="text-right text-[11px] text-slate-400">
          <div>{Math.round(data.metrics.throughput)} req/s</div>
          <div>{Math.round(data.metrics.totalLatency)} ms</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
        <Metric label="Entrada" value={`${Math.round(data.metrics.inputRps)} req/s`} />
        <Metric label="Falhas/s" value={`${Math.round(data.metrics.failures)}`} />
        <Metric label="Latência" value={`${Math.round(data.metrics.baseLatency)} ms`} />
        <Metric label="Total" value={`${Math.round(data.metrics.totalLatency)} ms`} />
      </div>

      {(data.type === 'client' || data.type === 'server') && (
        <label className="mt-3 block text-xs text-slate-400">
          Throughput
          <input
            type="range"
            min={0}
            max={Math.max(50, data.capacity * 2)}
            value={data.configuredThroughput}
            onChange={(event) =>
              data.onQuickUpdate(data.id, { configuredThroughput: Number(event.target.value) })
            }
            onMouseDown={(event) => event.stopPropagation()}
            onTouchStart={(event) => event.stopPropagation()}
            className="mt-1 w-full"
          />
        </label>
      )}

      <label className="mt-2 block text-xs text-slate-400">
        Taxa de falha
        <input
          type="range"
          min={0}
          max={25}
          value={data.simulatedFailureRate}
          onChange={(event) =>
            data.onQuickUpdate(data.id, { simulatedFailureRate: Number(event.target.value) })
          }
          onMouseDown={(event) => event.stopPropagation()}
          onTouchStart={(event) => event.stopPropagation()}
          className="mt-1 w-full"
        />
      </label>

      <div className="mt-3">
        <div className="mb-1 flex justify-between text-[11px] text-slate-400">
          <span>Carga</span>
          <span>{formatPercent(data.metrics.load)}</span>
        </div>
        <div className="h-2 rounded-full bg-slate-800">
          <div
            className={`h-2 rounded-full ${
              data.status === 'normal' ? 'bg-ok' : data.status === 'alert' ? 'bg-warn' : 'bg-danger'
            }`}
            style={{ width: `${Math.min(100, data.metrics.load * 100)}%` }}
          />
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!border-0 !bg-sky-400" />
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-slate-900/80 px-2 py-1.5">
      <div className="text-[10px] uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-0.5 text-sm text-slate-100">{value}</div>
    </div>
  )
}
