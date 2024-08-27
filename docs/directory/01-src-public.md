# `public`

A pasta `public/` é usada para servir os arquivos estáticos do seu site.

> [!TIP] DICA  
> No Nuxt 2, essa pasta era conhecida como [`static/`](https://v2.nuxt.com/docs/directory-structure/static).

Arquivos contidos dentro da pasta `public/` são servidos na raiz e não são modificados pelo processo de build. Isso é adequado para arquivos que precisam manter seus nomes (por exemplo, `robots.txt`) _ou_ que provavelmente não mudarão (por exemplo, `favicon.ico`).

```bash [Estrutura de Diretórios]
-| public/
---| favicon.ico
---| og-image.png
---| robots.txt
```

```vue [app.vue]
<script setup lang="ts">
useSeoMeta({
  ogImage: "/og-image.png",
});
</script>
```
