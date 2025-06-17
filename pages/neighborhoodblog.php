<?php
include_once '/projects/basicscopy.php';
?>
<div class="sub-top">
    <div data-aos="fade-down" style="margin:auto; width: fit-content;">
        <h1 class="ultratitle physics" style="background-color: var(--myblue); padding: 1rem; border-radius: 0.5rem">
            Neighborhood Blog</h1>
    </div>

    <div class="physics" data-aos="fade-down"
        style="margin:auto; width: fit-content; background-color: var(--myblue); padding: 1rem; border-radius: 0.5rem">
        <span>Updates on my trip to San Fransico, with HackClub</span>
    </div>
</div>

<div>
    <?php
    $md = file_get_contents(__DIR__ . '/../liveblog.md');

    $pattern = '/^###\s*(.+?)(?:\s+(\d{1,2}\/\d{1,2}))?\r?\n([\s\S]*?)(?=^###\s|\z)/m';
    preg_match_all($pattern, $md, $blocks, PREG_SET_ORDER);

    // Declare string format helpers first
    $hyphenToEmDash = function (string $txt) {
        return str_replace(' - ', ' — ', $txt);
    };

    $escapeAndStrong = function (string $txt) {
        $e = htmlspecialchars($txt, ENT_QUOTES);
        return preg_replace('/\*(.+?)\*/', '<strong>$1</strong>', $e);
    };

    foreach (array_reverse($blocks) as $blk) {
        list(, $rawTitle, $rawDate, $rawText) = $blk;

        $dt = DateTime::createFromFormat('n/j', $rawDate);
        $formatted = $dt ? ucfirst(strtolower($dt->format('M j'))) : '';

        $h = ucfirst($escapeAndStrong($rawTitle)) .
            ($formatted ? ' <span class="date">' . $formatted . '</span>' : '');

        $imgHtml = '';

        $content = trim($rawText);
        if (preg_match('/^!\[(.*?)\]\((.*?)\)\{(left|right|hole)\}\s*(\r?\n)?/i', $content, $imgMatch)) {
            $alt = htmlspecialchars($imgMatch[1]);
            $src = htmlspecialchars($imgMatch[2]);
            $float = $imgMatch[3];

            if ($float === 'hole') {
                $imgHtml = "<img src=\"$src\" alt=\"$alt\" class=\"full-image\" style=\"width: 100%; display: block; margin: 1rem 0;\">";
            } else {
                $imgHtml = "<img src=\"$src\" alt=\"$alt\" class=\"float-$float\" style=\"float: $float; max-width: 40%; margin: 0 1rem 1rem 0;\">";
            }

            // Remove image markdown from content
            $content = preg_replace('/^!\[(.*?)\]\((.*?)\)\{(left|right|hole)\}\s*(\r?\n)?/i', '', $content, 1);
        }

        $content = $escapeAndStrong($content);
        $content = $hyphenToEmDash($content);


        $output = '';
        $inSpan = false;
        $lines = explode("\n", $content);

        foreach ($lines as $line) {
            $line = ucfirst(trim($line));

            if (empty($line)) {
                if ($inSpan) {
                    $output .= '<br>';
                }
                continue;
            }

            if (preg_match('/^##\s+(.+)$/', $line, $matches)) {
                if ($inSpan) {
                    $output .= '</span>';
                    $inSpan = false;
                }
                $output .= '<h3 class="subheadline">' . $matches[1] . '</h3>';
            } else {
                if (!$inSpan) {
                    $output .= '<span>';
                    $inSpan = true;
                }
                $output .= $line . '<br>';
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
    ?>

</div>

<style>
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

    .full-image {
        display: block;
        width: 100%;
        margin: 1rem 0;
    }
</style>