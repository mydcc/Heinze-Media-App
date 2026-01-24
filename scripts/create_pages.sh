#!/bin/bash
for page in about metaverse contact xr-studio consulting imprint privacy-policy terms; do
  mkdir -p "src/routes/$page"
  cat > "src/routes/$page/+page.svelte" <<EOF
<script>
  let { data } = \$props();
</script>

<svelte:head>
  <title>Heinze Media</title>
</svelte:head>

<div class="container mx-auto py-20 px-6">
  <h1 class="text-4xl font-bold mb-4 uppercase">$page</h1>
  <p>Coming Soon</p>
</div>
EOF
done
