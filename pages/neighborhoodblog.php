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

    // Helper functions
    $hyphenToEmDash = fn(string $txt) => str_replace(' - ', ' — ', $txt);
    $formatText = function (string $txt): string {
        $escaped = htmlspecialchars($txt, ENT_QUOTES);

        // Convert markdown links: [text](url)
        $withLinks = preg_replace_callback(
            '/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/',
            fn($m) => '<a href="' . htmlspecialchars($m[2], ENT_QUOTES) . '" target="_blank" rel="noopener noreferrer">' . htmlspecialchars($m[1], ENT_QUOTES) . '</a>',
            $escaped
        );

        $withBold = preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $withLinks);
        return preg_replace('/\*(?!\*)(.+?)(?<!\*)\*/', '<em>$1</em>', $withBold);
    };

    // Helper function to process media (images and videos)
    $processMedia = function (string $line): ?string {
        // Image pattern: ![alt](src){classes}
        if (preg_match('/^!\[(.*?)\]\((.*?)\)\{(.*?)\}$/i', $line, $m)) {
            $alt = htmlspecialchars($m[1], ENT_QUOTES);
            $src = htmlspecialchars($m[2], ENT_QUOTES);
            $classList = array_map(
                fn($c) => 'float-' . preg_replace('/[^a-z0-9_-]/i', '', strtolower($c)),
                preg_split('/\s+/', $m[3])
            );

            // Check if it's a video file
            $isVideo = preg_match('/\.(mp4|webm|ogg)$/i', $src);

            if ($isVideo) {
                // Check if dontautostart is in the class list
                $dontAutostart = in_array('dontautostart', array_map('strtolower', preg_split('/\s+/', $m[3])));

                // Remove dontautostart from class list for CSS
                $classList = array_filter($classList, fn($c) => $c !== 'float-dontautostart');

                $videoAttrs = 'class="' . implode(' ', $classList) . '" alt="' . $alt . '"';

                if (!$dontAutostart) {
                    $videoAttrs .= ' autoplay muted loop playsinline';
                } else {
                    // Add controls, allow fullscreen, volume, etc.
                    $videoAttrs .= ' controls muted controlsList="nodownload"';
                }

                return "<video src=\"$src\" $videoAttrs></video>";
            } else {
                return "<img src=\"$src\" alt=\"$alt\" class=\"" . implode(' ', $classList) . "\">";
            }
        }

        // Video pattern: @[alt](src){classes} for videos
        if (preg_match('/^@\[(.*?)\]\((.*?)\)\{(.*?)\}$/i', $line, $m)) {
            $alt = htmlspecialchars($m[1], ENT_QUOTES);
            $src = htmlspecialchars($m[2], ENT_QUOTES);
            $classList = array_map(
                fn($c) => 'float-' . preg_replace('/[^a-z0-9_-]/i', '', strtolower($c)),
                preg_split('/\s+/', $m[3])
            );

            // Check if dontautostart is in the class list
            $dontAutostart = in_array('dontautostart', array_map('strtolower', preg_split('/\s+/', $m[3])));

            // Remove dontautostart from class list for CSS
            $classList = array_filter($classList, fn($c) => $c !== 'float-dontautostart');

            $videoAttrs = 'class="' . implode(' ', $classList) . '" alt="' . $alt . '"';

            if (!$dontAutostart) {
                $videoAttrs .= ' autoplay muted loop playsinline';
            } else {
                // Add controls, allow fullscreen, volume, etc.
                $videoAttrs .= ' controls muted controlsList="nodownload"';
            }

            return "<video src=\"$src\" $videoAttrs></video>";
        }

        return null;
    };

    // Helper function to close paragraphs
    $closeParagraph = function (bool $inParagraph, bool $inHidden, string &$output, string &$hidden): bool {
        if ($inParagraph) {
            if ($inHidden) {
                $hidden .= '</p>';
            } else {
                $output .= '</p>';
            }
            return false;
        }
        return $inParagraph;
    };

    echo '<div class="liveblogcontainer">';

    foreach (array_reverse($blocks) as $index => $blk) {
        list(, $rawTitle, $rawDate, $rawText) = $blk;

        // Card headline
        $dt = DateTime::createFromFormat('n/j', $rawDate);
        $formatted = $dt ? ucfirst(strtolower($dt->format('M j'))) : '';
        $h = ucfirst($formatText($rawTitle))
            . ($formatted ? ' <span class="date">' . $formatted . '</span>' : '');

        // Hero media after ###?
        $heroMedia = '';
        $content = trim($rawText);
        $lines = explode("\n", $content);
        if (isset($lines[0])) {
            $heroMedia = $processMedia(trim($lines[0]));
            if ($heroMedia) {
                array_shift($lines);
            }
        }

        // Prepare output vs hidden
        $output = '';
        $hidden = '';
        $inParagraph = false;
        $inHidden = false;
        $moreId = "more-block-$index";

        for ($i = 0; $i < count($lines); $i++) {
            $line = ucfirst(trim($lines[$i]));
            if ($line === '') {
                if ($inParagraph) {
                    $inParagraph = $closeParagraph($inParagraph, $inHidden, $output, $hidden);
                }
                continue;
            }

            // Single-# heading → hidden subheadline + optional media
            if (preg_match('/^#\s+(.+)$/', $line, $m1)) {
                $inParagraph = $closeParagraph($inParagraph, $inHidden, $output, $hidden);
                $inHidden = true;
                $hidden .= '<h2 class="lead">' . htmlspecialchars($m1[1], ENT_QUOTES) . '</h2>';

                // Look ahead for media right after this #
                if (isset($lines[$i + 1])) {
                    $media = $processMedia(trim($lines[$i + 1]));
                    if ($media) {
                        $hidden .= $media;
                        $i++; // skip media line
                    }
                }
                continue;
            }

            // Double-## subheadline → placed in either output or hidden
            if (preg_match('/^##\s+(.+)$/', $line, $m2)) {
                $inParagraph = $closeParagraph($inParagraph, $inHidden, $output, $hidden);
                $target = $inHidden ? 'hidden' : 'output';
                $$target .= '<h2 class="lead">' . htmlspecialchars($m2[1], ENT_QUOTES) . '</h2>';

                // Media right after ##
                if (isset($lines[$i + 1])) {
                    $media = $processMedia(trim($lines[$i + 1]));
                    if ($media) {
                        // Add img-cropped class for images in subheadlines
                        if (strpos($media, '<img') !== false) {
                            $media = str_replace('class="', 'class="img-cropped ', $media);
                        }
                        $$target .= $media;
                        $i++;
                    }
                }
                continue;
            }

            // Regular paragraph text
            if (!$inParagraph) {
                if ($inHidden) {
                    $hidden .= '<p>';
                } else {
                    $output .= '<p>';
                }
                $inParagraph = true;
            }
            $text = $formatText($hyphenToEmDash($line)) . '<br>';
            if ($inHidden) {
                $hidden .= $text;
            } else {
                $output .= $text;
            }
        }

        // Close any open paragraph
        $closeParagraph($inParagraph, $inHidden, $output, $hidden);

        // Render the card
        echo "<div class=\"card container separator liveblogcontext\">\n";
        echo "  <h2 class=\"headline\">{$h}</h2>\n";
        if ($heroMedia) {
            echo "  {$heroMedia}\n";
        }
        echo "  {$output}\n";

        // More button if hidden content exists
        if (trim($hidden) !== '') {
            echo "  <div id=\"$moreId\" class=\"hidden-content\" style=\"display:none;\">\n$hidden\n  </div>\n";
            echo "  <button class=\"more-btn\" onclick=\"\n"
                . "    document.getElementById('$moreId').style.display='block';\n"
                . "    this.style.display='none';\n"
                . "    document.getElementById('less-$moreId').style.display='inline-block';\n"
                . "\">More...</button>\n";
            echo "  <button id=\"less-$moreId\" class=\"less-btn\" style=\"display:none;\" onclick=\"\n"
                . "    document.getElementById('$moreId').style.display='none';\n"
                . "    this.style.display='none';\n"
                . "    this.parentNode.querySelector('.more-btn').style.display='inline-block';\n"
                . "\">Less...</button>\n";
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
        const container = document.querySelector('.liveblogcontainer');

        toggle.addEventListener('change', () => {
            const cards = Array.from(container.querySelectorAll('.card'));
            cards.reverse();
            container.innerHTML = '';
            cards.forEach(card => container.appendChild(card));
            label.textContent = toggle.checked ? 'Oldest First' : 'Newest First';
        });
    });
</script>

<style>
    .sub-top {
        background-image: url("/images/liveblog/goldendridge.png");
        background-repeat: no-repeat;
        background-size: 150% 140%;
        background-position-x: 60%;
        background-position-y: 20%;
        aspect-ratio: 6976/1599;
        background-color: unset !important;
    }


    .sub-top * {
        background-color: unset !important;
    }

    .lead {
        font-weight: 600;
        margin-top: var(--spacing-4) !important;
        margin-bottom: var(--spacing-1) !important;
    }

    p {
        max-width: unset !important;
        line-height: 1.6;
        margin-top: 0;
        margin-bottom: var(--spacing-2);
    }

    img,
    video {
        object-fit: cover;
        border-radius: 8px;
    }

    video {
        background-color: #000;
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

    .float-bigasmain {
        width: unset;
        height: unset;
    }

    .float-nobottommargin {
        margin-bottom: 0 !important;
    }

    .float-squished {
        width: 100% !important;
        height: 50% !important;
        object-fit: cover !important;
    }

    .float-githubhq {
        background-image: url(images/liveblog/githubhqpanorrama2.png);
        background-repeat: no-repeat;
        background-size: 122% auto;
        background-position-x: 48%;
        background-position-y: 83%;
        aspect-ratio: 6976 / 1599;
        background-color: unset !important;
    }

    .more-btn {
        background-color: var(--myblue);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        margin-top: 1rem;
        transition: background-color 0.2s ease;
    }

    .more-btn:hover {
        background-color: #005999;
    }

    .less-btn {
        background-color: var(--myblue);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        margin-top: 1rem;
        transition: background-color 0.2s ease;
    }

    .less-btn:hover {
        background-color: #005999;
    }

    .liveblogcontainer .container {
        padding-bottom: var(--spacing-3);
    }

    @media (max-width: 1070px) {
        .sub-top {
            align-content: center;
        }

        .sub-top * {
            color: white;
        }
    }

    @media (max-width: 500px) {
        .float-disapearat500px {
            display: none;
        }

        .liveblogcontext img,
        .liveblogcontext video {
            width: unset !important;
            height: unset !important;
            max-width: 100% !important;
            margin: 0 !important;
        }
    }
</style>