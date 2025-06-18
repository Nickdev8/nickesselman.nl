<div class="sub-top">
    <div data-aos="fade-down" style="margin:auto; width: fit-content;">
        <h1 class="ultratitle physics" style="background-color: var(--myblue); padding: 1rem; border-radius: 0.5rem">
            Neighborhood Blog</h1>
    </div>

    <div class="physics" data-aos="fade-down"
        style="margin:auto; width: fit-content; background-color: var(--myblue); padding: 1rem; border-radius: 0.5rem">
        <span>Updates on my trip to San Francisco, with HackClub</span>
    </div>
</div>
<div class="container" style="margin-top: 2rem;">
    <div style="display: flex; align-items: center; gap: 1rem; margin: 1rem 0;">
        <label class="special-switch">
            <input id="sortToggle" type="checkbox">
            <span class="special-slider"></span>
        </label>
        <h2 style="margin: 0;">Sort: <span id="sortLabel">Newest First</span></h2>
    </div>
</div>
<div>
    <?php
    $md = file_get_contents(__DIR__ . '/../liveblog.md');

    $pattern = '/^###\s*(.+?)(?:\s+(\d{1,2}\/\d{1,2}))?\r?\n([\s\S]*?)(?=^###\s|\z)/m';
    preg_match_all($pattern, $md, $blocks, PREG_SET_ORDER);

    $hyphenToEmDash = fn(string $txt) => str_replace(' - ', ' — ', $txt);
    $escapeAndStrong = fn(string $txt) => preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', htmlspecialchars($txt, ENT_QUOTES));

    echo '<div class="liveblogcontainer">';
    foreach (array_reverse($blocks) as $blk) {
        list(, $rawTitle, $rawDate, $rawText) = $blk;

        $dt = DateTime::createFromFormat('n/j', $rawDate);
        $formatted = $dt ? ucfirst(strtolower($dt->format('M j'))) : '';
        $h = ucfirst($escapeAndStrong($rawTitle)) .
            ($formatted ? ' <span class="date">' . $formatted . '</span>' : '');

        $imgHtml = '';
        $content = trim($rawText);
        $lines = explode("\n", $content);

        // Check if first line is an image line (after ###)
        if (preg_match('/^!\[(.*?)\]\((.*?)\)\{(.*?)\}$/i', trim($lines[0]), $imgMatch)) {
            $alt = htmlspecialchars($imgMatch[1]);
            $src = htmlspecialchars($imgMatch[2]);
            $classList = array_map(
                fn($c) => 'float-' . preg_replace('/[^a-z0-9_-]/i', '', strtolower($c)),
                preg_split('/\s+/', trim($imgMatch[3]))
            );
            $classes = implode(' ', $classList);
            $imgHtml = "<img src=\"$src\" alt=\"$alt\" class=\"$classes\">";
            array_shift($lines); // remove image line from content
        }

        $output = '';
        $inSpan = false;

        for ($i = 0; $i < count($lines); $i++) {
            $line = ucfirst(trim($lines[$i]));
            if ($line === '') {
                if ($inSpan)
                    $output .= '<br>';
                continue;
            }

            // ## Subheading
            if (preg_match('/^##\s+(.+)$/', $line, $matches)) {
                if ($inSpan) {
                    $output .= '</span>';
                    $inSpan = false;
                }

                $output .= '<h3 class="subheadline">' . $matches[1] . '</h3>';

                // Look ahead for image after ##
                if (isset($lines[$i + 1]) && preg_match('/^!\[(.*?)\]\((.*?)\)\{(.*?)\}$/i', trim($lines[$i + 1]), $imgMatch)) {
                    $alt = htmlspecialchars($imgMatch[1]);
                    $src = htmlspecialchars($imgMatch[2]);
                    $classList = array_map(
                        fn($c) => 'float-' . preg_replace('/[^a-z0-9_-]/i', '', strtolower($c)),
                        preg_split('/\s+/', trim($imgMatch[3]))
                    );
                    $classList[] = 'img-cropped';
                    $classes = implode(' ', $classList);
                    $output .= "<img src=\"$src\" alt=\"$alt\" class=\"$classes\">";
                    $i++; // skip image line
                }

            } else {
                if (!$inSpan) {
                    $output .= '<span>';
                    $inSpan = true;
                }
                $output .= $escapeAndStrong($hyphenToEmDash($line)) . '<br>';
            }
        }

        if ($inSpan) {
            $output .= '</span>';
        }

        echo "<div class=\"card container separator liveblogcontext\">\n";
        echo "  <h3 class=\"headline\">{$h}</h3>\n";
        if ($imgHtml)
            echo "  {$imgHtml}\n";
        echo "  {$output}\n";
        echo "</div>\n\n";
    }
    echo '</div>';
    ?>
</div>
<?php
include_once './pages/specials/totopbutton.php';
?>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.getElementById('sortToggle');
        const label = document.getElementById('sortLabel');
        const container = document.querySelector('div.liveblogcontainer'); // you can give it a class if needed

        toggle.addEventListener('change', () => {
            const cards = Array.from(container.querySelectorAll('.card'));
            cards.reverse(); // toggle order
            container.innerHTML = '';
            cards.forEach(card => container.appendChild(card));
            label.textContent = toggle.checked ? 'Oldest First' : 'Newest First';
        });
    });
</script>

<style>
    .liveblogcontext .subheadline {
        font-size: 2em;
        margin-top: var(--spacing-3);
        margin-bottom: var(--spacing-1);
    }

    .liveblogcontext img {
        border-radius: 8px;
    }

    .float-left {
        float: left;
        max-width: 40%;
        margin: 0 1rem 1rem 0;
    }

    .float-right {
        float: right;
        max-width: 40%;
        margin: 0 0 1rem 1rem;
    }

    .float-hole {
        display: block;
        width: 100%;
        margin: 1rem 0;
    }

    .float-vertical {
        width: 22rem;
        height: 30rem;
    }
</style>