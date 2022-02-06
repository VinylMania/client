export interface TextInputModel {
  id?: string
  type: string
  name?: string
  onChange?: React.Dispatch<React.SetStateAction<string>>
  placeholder?: string
  value?: string
  className?: string
  required?: boolean
  label?: string
  minLength?: number
  maxLength?: number
}
