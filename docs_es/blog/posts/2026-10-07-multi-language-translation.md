---
icon: lucide/rss
description: "μForge.io suma traducciones a siete idiomas, creadas con herramientas LLM tras muchas iteraciones."
---

# Traducción multilingüe, una iteración tras otra [2026-10-07] { #multi-language-translation-2026-10-07 }

Los ingenieros de sistemas embebidos leen la documentación en el idioma en el que piensan, así que μForge.io ya ofrece traducciones al chino, japonés, español, alemán, francés, portugués y ruso, además del original en inglés.

### Con herramientas LLM y muchas iteraciones { #built-with-llm-tools }

Nada de esto habría sido viable sin las herramientas LLM, y estamos agradecidos por ellas. Pero no fue una sola ejecución: hicieron falta muchas iteraciones, por dos motivos. El primero es el límite del plan de uso: un trabajo largo de traducción solía alcanzar su límite antes de terminar las páginas y había que esperar a que se restableciera el límite o continuar en otra herramienta. Los múltiples reinicios gratuitos de ChatGPT ayudaron muchísimo, y damos las gracias por ello. El segundo es que traducir así es lento e ineficiente: las páginas técnicas son largas y están llenas de tablas, código, nombres de pines y enlaces cruzados, de modo que cada pasada producía algo que había que revisar, corregir y volver a ejecutar.

### Mantener la coherencia { #keeping-translations-consistent }

Para que las iteraciones convergieran, mantenemos un glosario de términos que deben quedar sin traducir (referencias de pieza, unidades, nombres de protocolos) o usar una traducción aprobada, además de una lista de comprobación de QA que cubre la integridad técnica, la corrección de enlaces y anclas, y la seguridad del Markdown y del código. Cada idioma conserva la misma estructura de páginas que el original en inglés y las compilaciones se verifican en modo estricto, de modo que un enlace roto o una página ausente falla de forma visible en lugar de publicarse en silencio.

### Una advertencia y una petición { #caveat-and-request }

Son traducciones asistidas por máquina y las páginas en inglés siguen siendo la referencia. Como ninguno de estos idiomas es nuestra lengua materna, es posible que algunas páginas no suenen naturales a los hablantes nativos. Cuando un detalle técnico sea importante para su diseño, contrástelo con la página en inglés y con la documentación oficial de SiFli. Si encuentra una traducción incorrecta o un término poco natural, o cree que alguna página puede mejorar, [cuéntenoslo](../../about/contact.md); esos comentarios pasan directamente al glosario para que el error no vuelva a aparecer.

### Próximos pasos { #next }

Seguiremos refinando la terminología, buscaremos la revisión de lectores nativos cuando sea posible y mantendremos las traducciones al día cuando cambien las páginas en inglés.
