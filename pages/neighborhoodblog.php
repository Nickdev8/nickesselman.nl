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
    $escapeAndStrong = fn(string $txt) =>
        preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', htmlspecialchars($txt, ENT_QUOTES));

    echo '<div class="liveblogcontainer">';

    foreach (array_reverse($blocks) as $index => $blk) {
        list(, $rawTitle, $rawDate, $rawText) = $blk;

        // → Card headline
        $dt = DateTime::createFromFormat('n/j', $rawDate);
        $formatted = $dt ? ucfirst(strtolower($dt->format('M j'))) : '';
        $h = ucfirst($escapeAndStrong($rawTitle))
            . ($formatted ? ' <span class="date">' . $formatted . '</span>' : '');

        // → Hero-image after ###?
        $imgHtml = '';
        $content = trim($rawText);
        $lines = explode("\n", $content);
        if (preg_match('/^!\[(.*?)\]\((.*?)\)\{(.*?)\}$/i', trim($lines[0]), $m)) {
            $alt = htmlspecialchars($m[1], ENT_QUOTES);
            $src = htmlspecialchars($m[2], ENT_QUOTES);
            $classList = array_map(
                fn($c) => 'float-' . preg_replace('/[^a-z0-9_-]/i', '', strtolower($c)),
                preg_split('/\s+/', $m[3])
            );
            $imgHtml = "<img src=\"$src\" alt=\"$alt\" class=\"" . implode(' ', $classList) . "\">";
            array_shift($lines);
        }

        // → Prepare output vs hidden
        $output = '';
        $hidden = '';
        $inSpan = false;
        $inHidden = false;
        $moreId = "more-block-$index";

        for ($i = 0; $i < count($lines); $i++) {
            $line = ucfirst(trim($lines[$i]));
            if ($line === '') {
                if ($inSpan) {
                    if ($inHidden)
                        $hidden .= '<br>';
                    else
                        $output .= '<br>';
                }
                continue;
            }

            //
            // 1) Single-# heading → hidden subheadline + optional image
            //
            if (preg_match('/^#\s+(.+)$/', $line, $m1)) {
                // close any open span
                if ($inSpan) {
                    if ($inHidden)
                        $hidden .= '</span>';
                    else
                        $output .= '</span>';
                    $inSpan = false;
                }
                $inHidden = true;
                $hidden .= '<h3 class="subheadline">' . htmlspecialchars($m1[1], ENT_QUOTES) . '</h3>';

                // look ahead for image right after this #
                if (
                    isset($lines[$i + 1]) &&
                    preg_match('/^!\[(.*?)\]\((.*?)\)\{(.*?)\}$/i', trim($lines[$i + 1]), $mImg)
                ) {
                    $alt = htmlspecialchars($mImg[1], ENT_QUOTES);
                    $src = htmlspecialchars($mImg[2], ENT_QUOTES);
                    $classList = array_map(
                        fn($c) => 'float-' . preg_replace('/[^a-z0-9_-]/i', '', strtolower($c)),
                        preg_split('/\s+/', $mImg[3])
                    );
                    $hidden .= "<img src=\"$src\" alt=\"$alt\" class=\"" . implode(' ', $classList) . "\">";
                    $i++; // skip image line
                }
                continue;
            }

            //
            // 2) Double-## subheadline → placed in either output or hidden
            //
            if (preg_match('/^##\s+(.+)$/', $line, $m2)) {
                if ($inSpan) {
                    if ($inHidden)
                        $hidden .= '</span>';
                    else
                        $output .= '</span>';
                    $inSpan = false;
                }
                $target = $inHidden ? 'hidden' : 'output';
                $$target .= '<h3 class="subheadline">' . htmlspecialchars($m2[1], ENT_QUOTES) . '</h3>';

                // image right after ##
                if (
                    isset($lines[$i + 1]) &&
                    preg_match('/^!\[(.*?)\]\((.*?)\)\{(.*?)\}$/i', trim($lines[$i + 1]), $mImg2)
                ) {
                    $alt = htmlspecialchars($mImg2[1], ENT_QUOTES);
                    $src = htmlspecialchars($mImg2[2], ENT_QUOTES);
                    $classList = array_map(
                        fn($c) => 'float-' . preg_replace('/[^a-z0-9_-]/i', '', strtolower($c)),
                        preg_split('/\s+/', $mImg2[3])
                    );
                    $classList[] = 'img-cropped';
                    $$target .= "<img src=\"$src\" alt=\"$alt\" class=\"" . implode(' ', $classList) . "\">";
                    $i++;
                }
                continue;
            }

            //
            // 3) Regular paragraph text
            //
            if (!$inSpan) {
                if ($inHidden)
                    $hidden .= '<span>';
                else
                    $output .= '<span>';
                $inSpan = true;
            }
            $text = $escapeAndStrong($hyphenToEmDash($line)) . '<br>';
            if ($inHidden)
                $hidden .= $text;
            else
                $output .= $text;
        }

        // close any open span
        if ($inSpan) {
            if ($inHidden)
                $hidden .= '</span>';
            else
                $output .= '</span>';
        }

        // → Render the card
        echo "<div class=\"card container separator liveblogcontext\">\n";
        echo "  <h3 class=\"headline\">{$h}</h3>\n";
        if ($imgHtml)
            echo "  {$imgHtml}\n";
        echo "  {$output}\n";

        // → More button if hidden content exists
        if (trim($hidden) !== '') {
            echo "  <div id=\"$moreId\" class=\"hidden-content\" style=\"display:none;\">\n$hidden\n  </div>\n";
            echo "  <button class=\"more-btn\" onclick=\"\n"
                . "    document.getElementById('$moreId').style.display='block';\n"
                . "    this.style.display='none';\n"
                . "\">More...</button>\n";
        }

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
        object-fit: cover;
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
        object-fit: cover;
        width: 22rem;
        height: 30rem;
    }

    .float-horizantal {
        object-fit: cover;
        width: 30rem;
        height: 22rem;
    }
    


    .more-btn {
        background-color: var(--myblue);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        margin-top: 1rem;
    }

    .more-btn:hover {
        background-color: #005999;
    }

    .liveblogcontainer .container {
        padding-bottom: var(--spacing-3);
    }
</style>