export interface TextInputModel {
  id: string
  type: string
  name: string
  onChange: any
  placeholder?: string
  value: string
  className?: string
  required: boolean
  label?: string
}
