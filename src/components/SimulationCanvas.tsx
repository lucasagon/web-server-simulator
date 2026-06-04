import { useEffect, useState } from 'react'
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
  type OnEdgesChange,
  type OnNodesChange,
} from 'reactflow'
import 'reactflow/dist/style.css'
import type { ComponentType } from '../types'
import { ComponentNode } from './ComponentNode'
interface SimulationCanvasProps {
  nodes: Node[]
  edges: Edge[]
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: (connection: Connection) => void
  onDropComponent: (type: ComponentType, x: number, y: number) => void
  onSelectionChange: (nodeId: string | null) => void
}

const nodeTypes: NodeTypes = {
  architecture: ComponentNode,
}

export function SimulationCanvas(props: SimulationCanvasProps) {
  return (
    <ReactFlowProvider>
      <CanvasInner {...props} />
    </ReactFlowProvider>
  )
}

function CanvasInner(props: SimulationCanvasProps) {
  const reactFlow = useReactFlow()
  const [spacePressed, setSpacePressed] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setSpacePressed(true)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setSpacePressed(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <div
      className="rf-canvas relative flex-1"
      onDragOver={(event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
      }}
      onDrop={(event) => {
        event.preventDefault()
        const type = event.dataTransfer.getData('application/reactflow') as ComponentType
        const position = reactFlow.screenToFlowPosition({ x: event.clientX, y: event.clientY })
        if (type) props.onDropComponent(type, position.x, position.y)
      }}
    >
      <style>{`
        .rf-canvas .react-flow__pane { cursor: ${spacePressed ? 'grab' : 'default'} !important; }
        .rf-canvas .react-flow__pane:active { cursor: ${spacePressed ? 'grabbing' : 'default'} !important; }
      `}</style>
      <ReactFlow
        nodes={props.nodes}
        edges={props.edges}
        nodeTypes={nodeTypes}
        onNodesChange={props.onNodesChange}
        onEdgesChange={props.onEdgesChange}
        onConnect={props.onConnect}
        onSelectionChange={(selection) => props.onSelectionChange(selection.nodes[0]?.id ?? null)}
        panOnDrag={spacePressed}
        nodesDraggable={true}
        fitView
      >
        <MiniMap pannable zoomable className="!bg-slate-950/90" />
        <Controls className="!bg-slate-900" />
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.2} color="#1e3a5f" />
      </ReactFlow>
    </div>
  )
}
