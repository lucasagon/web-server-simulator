import { MarkerType, type Edge, type Node } from 'reactflow'
import type { ArchitectureEdgeData, ArchitectureNodeData } from '../types'

export function buildFlowNodes(
  nodes: ArchitectureNodeData[],
  onQuickUpdate: (id: string, patch: Partial<ArchitectureNodeData>) => void,
): Node[] {
  return nodes.map((node) => ({
    id: node.id,
    type: 'architecture',
    position: node.position,
    data: {
      ...node,
      onQuickUpdate,
    },
  }))
}

export function buildFlowEdges(edges: ArchitectureEdgeData[]): Edge[] {
  return edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    markerEnd: { type: MarkerType.ArrowClosed },
    style:
      edge.status === 'critical'
        ? { stroke: '#ef4444', strokeWidth: 2.2, strokeDasharray: edge.throughput > 0 ? '8 4' : undefined }
        : edge.status === 'alert'
          ? { stroke: '#facc15', strokeWidth: 2, strokeDasharray: edge.throughput > 0 ? '8 4' : undefined }
          : { stroke: '#22c55e', strokeWidth: 1.8, strokeDasharray: edge.throughput > 0 ? '8 4' : undefined },
    label: `${Math.round(edge.throughput)} req/s`,
    labelStyle: { fill: '#cbd5e1', fontSize: 11 },
    data: edge,
  }))
}
