<script lang="ts">
	let { children } = $props();
</script>

<div class="site-topper" aria-hidden="true"></div>
<div class="layout-shell">
	<a class="skip-link" href="#main-content">Skip to content</a>

	<header class="site-header">
		<a class="brand" href="/en">
			<span class="brand-dot" aria-hidden="true"></span>
			<span>Nick Esselman</span>
		</a>

		<nav class="site-nav" aria-label="Main menu">
			<ul>
				<li><a href="/en">Home</a></li>
				<li><a href="/en/about">About</a></li>
				<li><a href="/en/how-i-help">How I help</a></li>
				<li><a href="/en/contact">Contact</a></li>
			</ul>
		</nav>

		<a class="lang-link" href="/">Nederlands</a>
	</header>

	<main id="main-content" class="site-main">
		{@render children()}
	</main>

	<footer class="site-footer">
		<p><strong>Nick Esselman</strong> · your local tech person</p>
		<p>Spaarndam · working in Haarlem, Amsterdam and Spaarndam</p>
		<p><a href="/en/contact">Feel free to message me, even if it is just a question</a></p>
		<small>No sales language, just honest advice and practical build steps.</small>
	</footer>
</div>
