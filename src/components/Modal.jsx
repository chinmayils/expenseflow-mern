import { X } from 'lucide-react'
export default function Modal({ open, title, children, onClose }) {
  if (!open) return null
  return <div className="modal-backdrop" onMouseDown={onClose}>
    <div className="modal-card" onMouseDown={e => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-5"><h3 className="text-lg font-bold">{title}</h3><button className="icon-btn" onClick={onClose}><X size={18}/></button></div>
      {children}
    </div>
  </div>
}
