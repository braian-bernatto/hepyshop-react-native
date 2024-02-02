export type Producto = {
  producto_id: number
  producto_nombre: string
  producto_cantidad: number
  unidad_medida_id: number
  estado_producto_id: number

  estado_producto_descri: string
  unidad_medida_descri: string
  categorias: CategoriaProducto[]
  imagenes: Imagen[]
}

export type UnidadMedida = {
  unidad_medida_id: number
  unidad_medida_descri: string
}

export type EstadoProducto = {
  estado_producto_id: number
  estado_producto_descri: string
}

export type CategoriaProducto = {
  categoria_producto_id: number
  categoria_producto_descri: string
}

export type CategoriaDetalle = {
  categoria_producto_id: number
  producto_id: string
}

export type Imagen = {
  producto_id: number
  imagen_url: string
}

export type Usuario = {
  usuario_id: number
  usuario_nombre: string
  usuario_password: string
  usuario_correo: string
  usuario_aprobado: boolean
  usuario_admin: boolean
}

export type RootStackParams = {
  Home: undefined
  Detalles: Producto
  Editar: Producto
}

export type ProductoErrors = {
  producto_id: string
  producto_nombre: string
  producto_cantidad: string
  unidad_medida_id: string
  estado_producto_id: string
  categorias: string
  imagenes: string
}
