<script lang="ts">
	let { children } = $props();
</script>

<div class="site-topper" aria-hidden="true"></div>
<div class="layout-shell">
	<a class="skip-link" href="#main-content">Direct naar inhoud</a>

	<header class="site-header">
		<a class="brand" href="/">
			<span class="brand-dot" aria-hidden="true"></span>
			<span>Nick Esselman</span>
		</a>

		<nav class="site-nav" aria-label="Hoofdmenu">
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/over-mij">Over mij</a></li>
				<li><a href="/wat-ik-kan-helpen">Wat ik kan helpen</a></li>
				<li><a href="/contact">Contact</a></li>
			</ul>
		</nav>

		<a class="lang-link" href="/en">English</a>
	</header>

	<main id="main-content" class="site-main">
		{@render children()}
	</main>

	<footer class="site-footer">
		<p><strong>Nick Esselman</strong> · de lokale tech persoon</p>
		<p>Spaarndam · werkgebied: Haarlem, Amsterdam en Spaarndam</p>
		<p><a href="/contact">Stuur gerust een bericht (ook als je alleen een vraag hebt)</a></p>
		<small>Geen marketingpraat, gewoon eerlijk advies en duidelijke bouwstappen.</small>
	</footer>
</div>
