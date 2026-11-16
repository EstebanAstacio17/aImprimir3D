/**
 * AIMPRIMIR3D - Motor de Diagnóstico y Cotización Inteligente
 * Maneja la interacción del cliente, feedback de urgencia vs tiempo,
 * cálculo financiero 100% oculto y despacho multicanal (Email + WhatsApp).
 */

document.addEventListener("DOMContentLoaded", () => {
  const quoteForm = document.getElementById("quote-diagnostic-form");
  if (!quoteForm) return;

  // 1. Detectar si viene un producto pre-seleccionado desde la tienda
  const urlParams = new URLSearchParams(window.location.search);
  const selectedProduct = urlParams.get("producto");
  if (selectedProduct) {
    const descripcionField = document.getElementById("field-descripcion");
    const tipoSolicitudField = document.getElementById("field-tipo-solicitud");
    if (descripcionField) {
      descripcionField.value = `Deseo cotizar el producto del catálogo: "${selectedProduct}".\nDetalles adicionales: `;
    }
    if (tipoSolicitudField) {
      tipoSolicitudField.value = "producto_catalogo";
    }
  }

  // 2. Manejo visual de la regla "Menor tiempo = Mayor costo"
  const urgencyRadios = document.querySelectorAll('input[name="tiempo_entrega"]');
  const urgencyBanner = document.getElementById("urgency-feedback-banner");

  const urgencyMessages = {
    express: {
      text: "⚡ <strong>Entrega Express (24 a 48 horas):</strong> Asignamos prioridad inmediata a tus piezas en nuestras impresoras. Al requerir menor tiempo de fabricación y despacho, aplica recargo de urgencia en máquina.",
      className: "banner-urgent",
      multiplier: 1.6,
      code: "T160",
    },
    prioritario: {
      text: "🚀 <strong>Entrega Prioritaria (3 a 5 días hábiles):</strong> Tu proyecto entra en la cola de producción preferencial con ajuste moderado por tiempo acelerado.",
      className: "banner-urgent",
      multiplier: 1.25,
      code: "T125",
    },
    estandar: {
      text: "📅 <strong>Entrega Estándar (1 a 2 semanas):</strong> El ritmo de producción regular de nuestro taller. Te ofrece el costo base más competitivo y equilibrado.",
      className: "banner-standard",
      multiplier: 1.0,
      code: "T100",
    },
    flexible: {
      text: "🌱 <strong>Entrega Flexible (+2 semanas):</strong> Sin prisa. Ideal para proyectos personales o pedidos por volumen donde buscas optimizar costos al máximo.",
      className: "banner-standard",
      multiplier: 0.9,
      code: "T090",
    },
  };

  function updateUrgencyFeedback() {
    let selected = "estandar";
    urgencyRadios.forEach((r) => {
      if (r.checked) selected = r.value;
    });

    const info = urgencyMessages[selected] || urgencyMessages.estandar;
    if (urgencyBanner) {
      urgencyBanner.className = `time-cost-banner ${info.className}`;
      urgencyBanner.innerHTML = `<i class="fas fa-info-circle fa-lg mt-1"></i><div>${info.text}</div>`;
    }
  }

  urgencyRadios.forEach((r) => {
    r.addEventListener("change", updateUrgencyFeedback);
  });
  updateUrgencyFeedback();

  // 3. MOTOR DE CÁLCULO FINANCIERO INTERNO (100% OCULTO PARA EL CLIENTE)
  function calculateInternalFinancialMetrics() {
    // A. Multiplicador de Urgencia
    let tiempoVal = "estandar";
    urgencyRadios.forEach((r) => {
      if (r.checked) tiempoVal = r.value;
    });
    const urgencyData = urgencyMessages[tiempoVal] || urgencyMessages.estandar;
    const multUrgencia = urgencyData.multiplier;

    // B. Tamaño base estimado
    const tamano = document.getElementById("field-tamano")?.value || "mediano";
    let baseTamano = 1500;
    if (tamano === "pequeno") baseTamano = 650;
    else if (tamano === "mediano") baseTamano = 1500;
    else if (tamano === "grande") baseTamano = 3800;
    else if (tamano === "serie") baseTamano = 2600;

    // C. Cantidad
    const cantidad = Math.max(1, parseInt(document.getElementById("field-cantidad")?.value || 1, 10));
    let factorVolumen = 1.0;
    if (cantidad >= 20) factorVolumen = 0.65;
    else if (cantidad >= 5) factorVolumen = 0.8;
    else if (cantidad >= 2) factorVolumen = 0.92;

    // D. Estado del Archivo / Necesidad de Diseño 3D
    const estadoArchivo = document.getElementById("field-archivo-3d")?.value || "tengo_stl";
    let costoDiseno = 0;
    let labelDiseno = "Sin costo de diseño (Tiene STL)";
    if (estadoArchivo === "tengo_pieza_fisica") {
      costoDiseno = 850;
      labelDiseno = "Digitalización/Ing. Inversa (+RD$ 850)";
    } else if (estadoArchivo === "solo_idea") {
      costoDiseno = 1800;
      labelDiseno = "Diseño CAD desde cero (+RD$ 1,800)";
    }

    // E. Uso / Material requerido
    const usoPieza = document.getElementById("field-uso-pieza")?.value || "general";
    let factorMaterial = 1.0;
    let labelMaterial = "PLA Estándar";
    if (usoPieza === "mecanico_calor") {
      factorMaterial = 1.3;
      labelMaterial = "PETG / ABS / Alta Temperatura";
    } else if (usoPieza === "flexible") {
      factorMaterial = 1.4;
      labelMaterial = "TPU Flexible";
    } else if (usoPieza === "resina_detalle") {
      factorMaterial = 1.45;
      labelMaterial = "Resina UV Alta Precisión";
    }

    // F. Fórmulas de cálculo de costo base y sugerido
    const costoProduccionBase = Math.round(baseTamano * factorMaterial * cantidad * factorVolumen);
    const pisoTecnicoMinimo = costoProduccionBase + costoDiseno;
    const precioSugeridoConUrgencia = Math.round(pisoTecnicoMinimo * multUrgencia);

    // G. Análisis de Presupuesto y Costo del Problema
    const presupuestoIngresado = parseFloat(document.getElementById("field-presupuesto")?.value || 0);
    const costoProblemaIngresado = parseFloat(document.getElementById("field-costo-problema")?.value || 0);

    let scoreLead = "A1";
    let diagnosticoLead = "✅ VIABLE ESTÁNDAR";
    let estrategiaSugerida = "Cotizar en rango sugerido estándar.";

    if (presupuestoIngresado > 0) {
      if (presupuestoIngresado >= precioSugeridoConUrgencia) {
        scoreLead = "A+";
        diagnosticoLead = "🔥 LEAD ALTAMENTE RENTABLE (Presupuesto solvente)";
        estrategiaSugerida = "Ofrecer paquete premium con entrega prioritaria garantizada.";
      } else if (presupuestoIngresado < pisoTecnicoMinimo) {
        scoreLead = "C-";
        diagnosticoLead = "⚠️ ALERTA DE PRESUPUESTO (Por debajo del piso técnico)";
        estrategiaSugerida = "Proponer reducir cantidad, cambiar a tiempo estándar o simplificar diseño.";
      } else {
        scoreLead = "B2";
        diagnosticoLead = "⚖️ NEGOCIABLE (Cubre piso pero ajustado)";
        estrategiaSugerida = "Ajustar precio entre piso y sugerido según urgencia del cliente.";
      }
    }

    // Código técnico compacto para WhatsApp: #AIM-T[Urgencia]-B[Piso]-S[Sugerido]-[Score]
    const codigoTecnico = `#AIM-${urgencyData.code}-B${pisoTecnicoMinimo}-S${precioSugeridoConUrgencia}-${scoreLead}`;

    return {
      multUrgenciaText: `${multUrgencia}x (${tiempoVal})`,
      pisoTecnicoMinimo,
      precioSugeridoConUrgencia,
      labelDiseno,
      labelMaterial,
      diagnosticoLead,
      estrategiaSugerida,
      presupuestoIngresado,
      costoProblemaIngresado,
      codigoTecnico,
    };
  }

  // 4. Inyectar datos calculados en los campos ocultos de FormSubmit
  function syncHiddenFormFields() {
    const calc = calculateInternalFinancialMetrics();

    document.getElementById("hidden-piso-tecnico").value = `RD$ ${calc.pisoTecnicoMinimo.toLocaleString("es-DO")}`;
    document.getElementById("hidden-precio-sugerido").value = `RD$ ${calc.precioSugeridoConUrgencia.toLocaleString("es-DO")}`;
    document.getElementById("hidden-urgencia-mult").value = calc.multUrgenciaText;
    document.getElementById("hidden-diagnostico-lead").value = calc.diagnosticoLead;
    document.getElementById("hidden-estrategia").value = calc.estrategiaSugerida;
    document.getElementById("hidden-codigo-interno").value = calc.codigoTecnico;
    document.getElementById("hidden-desglose-material").value = calc.labelMaterial;
    document.getElementById("hidden-desglose-diseno").value = calc.labelDiseno;

    return calc;
  }

  // 5. Envío tradicional por Email (FormSubmit)
  quoteForm.addEventListener("submit", (e) => {
    syncHiddenFormFields();
    // El formulario continúa normalmente hacia FormSubmit
  });

  // 6. Envío y Redirección Inteligente a WhatsApp
  const btnWhatsAppCotizar = document.getElementById("btn-cotizar-whatsapp");
  if (btnWhatsAppCotizar) {
    btnWhatsAppCotizar.addEventListener("click", () => {
      // Validar campos requeridos mínimos
      const nombre = document.getElementById("field-nombre")?.value.trim();
      const telefono = document.getElementById("field-telefono")?.value.trim();
      const descripcion = document.getElementById("field-descripcion")?.value.trim();

      if (!nombre || !telefono || !descripcion) {
        alert("Por favor completa al menos tu Nombre, Teléfono/WhatsApp y la descripción de tu proyecto.");
        return;
      }

      // Sincronizar y obtener cálculo
      const calc = syncHiddenFormFields();

      // Envío en segundo plano a FormSubmit (para respaldo en correo)
      const formData = new FormData(quoteForm);
      fetch(quoteForm.action, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      }).catch((err) => console.log("Silent email dispatch:", err));

      // Construir mensaje amigable para WhatsApp con el código técnico al final
      const tiempoTexto = document.querySelector('input[name="tiempo_entrega"]:checked')?.parentElement?.querySelector('.urgency-title')?.innerText || "Estándar";
      const presupuestoStr = calc.presupuestoIngresado > 0 ? `RD$ ${calc.presupuestoIngresado.toLocaleString("es-DO")}` : "A definir según cotización";

      const waText = 
`👋 *Hola AIMPRIMIR3D!* Deseo cotizar un proyecto:

👤 *Nombre:* ${nombre}
📞 *Teléfono:* ${telefono}
🛠️ *Detalle:* ${descripcion}
📦 *Cantidad:* ${document.getElementById("field-cantidad")?.value || 1} pieza(s)
📐 *Tamaño aprox:* ${document.getElementById("field-tamano")?.selectedOptions[0]?.text || "Mediano"}
⏱️ *Plazo deseado:* ${tiempoTexto}
💵 *Presupuesto estimado:* ${presupuestoStr}

🏷️ *Ref. Registro:* ${calc.codigoTecnico}`;

      const waUrl = `https://wa.me/18494622228?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, "_blank");
    });
  }
});
