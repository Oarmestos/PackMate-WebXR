# 🎮 PackMate WebXR - Controles y Uso

## 📋 **Controles Actuales (Navegador)**

### ⌨️ **Teclado**
| Tecla | Acción |
|-------|--------|
| **L** | Toggle (mostrar/ocultar) la lista de empaque |
| **R** | Reset - marca todos los items como NO empacados |
| **H** | Muestra ayuda en la consola del navegador |

### 🖱️ **Mouse**
| Acción | Resultado |
|--------|-----------|
| **Click en item de la lista** | Marca el item como empacado (○ → ✓) |
| **Click en botón X** | Cierra la lista de empaque |
| **Click + Drag** | Rota la cámara 3D |
| **Scroll** | Zoom in/out |
| **Right Click + Drag** | Pan (mover cámara) |

---

## 🥽 **Controles en Meta Quest (VR)**

### 🖐️ **Gestos de Mano** (Planeados)
| Gesto | Acción |
|-------|--------|
| **Palma abierta (mano izquierda)** | Mostrar/ocultar lista |
| **Pinch (mano derecha)** | Agarrar item |
| **Apuntar a maleta** | Activar detección |

> **Nota**: Los gestos de mano están en desarrollo. Actualmente usa los controles de teclado/mouse.

---

## ✅ **Cómo Usar PackMate**

### Paso 1: Abrir la Lista
- **Opción A**: Presiona `L` en el teclado
- **Opción B**: Espera 1 segundo (se abre automáticamente)

### Paso 2: Marcar Items como Empacados
1. **Haz click** directamente sobre el nombre del item (ej: "Shirts")
2. El item cambiará:
   - ○ → ✓ (checkbox)
   - Blanco → Verde (color)
   - Texto tachado
3. La barra de progreso se actualizará automáticamente

### Paso 3: Ver Progreso
- **Contador**: "X / 8 packed" (arriba de la barra)
- **Barra visual**: Se llena en cyan conforme empacas
- **Animación**: Efecto shimmer en la barra

### Paso 4: Completar
- Cuando empacas todos los 8 items:
  - Aparece mensaje "All Packed! ✓"
  - "Have a great trip! ✈️"
  - Puedes presionar `R` para resetear

---

## 🐛 **Solución de Problemas**

### ❌ "No puedo hacer click en los items"

**Solución:**
1. Asegúrate que la lista esté visible (presiona `L`)
2. Haz click directamente sobre el TEXTO del item, no en el espacio vacío
3. Abre la consola del navegador (F12) y verifica si aparece el log: `"Clicked item: Shirts, Packed: false"`
4. Si no aparece el log, refresca la página (F5)

### ❌ "La lista no aparece"

**Solución:**
1. Presiona `L` para toggle
2. Verifica que `listVisible` esté en `true` en el store
3. Refresca la página

### ❌ "Los errores de consola no desaparecen"

**Solución:**
1. Detén el servidor (Ctrl+C en terminal)
2. Borra `node_modules`: `rm -rf node_modules`
3. Reinstala: `npm install --legacy-peer-deps`
4. Reinicia: `npm run dev`

---

## 🎯 **Flujo Completo de Uso**

```
1. Abre http://localhost:5173/PackMate-WebXR/
2. Espera a que aparezca la lista (1 segundo)
3. Observa la maleta detectada (wireframe cyan)
4. Click en "Shirts" → se marca como empacado ✓
5. Click en "Pants" → se marca como empacado ✓
6. Continúa hasta empacar todos los 8 items
7. Aparece mensaje de completado
8. Presiona R para resetear y volver a empezar
```

---

## 📊 **Indicadores Visuales**

### Estados de Items:
- **No empacado**: ○ blanco + texto blanco
- **Hover**: Fondo cyan + borde cyan + "← Click"
- **Empacado**: ✓ verde + texto verde tachado + fondo verde

### Maleta:
- **Escaneando**: "🔍 Scanning for suitcase..."
- **Detectada**: Wireframe cyan + "✓ Suitcase Detected" + "Confidence: 92%"
- **Animación**: Rotación suave + pulso de brillo

### Progreso:
- **Barra vacía**: Gris oscuro
- **Barra llena**: Gradiente cyan con shimmer
- **Texto**: "0 / 8 packed" → "8 / 8 packed"

---

## 🔧 **Configuración Avanzada**

### Cambiar Items de la Lista:
Edita `src/store/packingStore.js`:
```javascript
items: [
  { id: 1, name: 'Tu Item', packed: false, category: 'Categoria' },
  // Agrega más items aquí
]
```

### Cambiar Tamaño de Maleta:
Edita `src/components/SuitcaseDetector.jsx`:
```javascript
const suitcaseSize = [1.8, 1.2, 0.9] // [ancho, alto, profundidad]
```

### Cambiar Posición de Lista:
Edita `src/components/PackingListOverlay.css`:
```css
.packing-list-overlay {
  left: 15%; /* Cambia este valor */
  top: 50%;
}
```

---

## 📱 **Próximas Funcionalidades**

- [ ] Drag & drop real con manos
- [ ] Detección real de maleta con Scene Understanding API
- [ ] Sonidos al empacar items
- [ ] Animaciones de partículas
- [ ] Listas personalizadas
- [ ] Sincronización en la nube

---

**¿Necesitas ayuda?** Abre la consola del navegador (F12) y presiona `H` para ver los controles disponibles.
