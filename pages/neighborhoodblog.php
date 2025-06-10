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

<div style="
    display: flex;
    flex-direction: column-reverse;">
    <?php
    $md = file_get_contents(__DIR__ . '/../liveblog.md');

    $pattern = '/^###\s*(.+?)\s+(\d{1,2}\/\d{1,2})\r?\n([\s\S]*?)(?=^###\s|\z)/m';
    preg_match_all($pattern, $md, $blocks, PREG_SET_ORDER);

    $hyphenToEmDash = function (string $txt) {
        return str_replace(' - ', ' — ', $txt);
    };

    foreach ($blocks as $blk) {
        list(, $rawTitle, $rawDate, $rawText) = $blk;

        $dt = DateTime::createFromFormat('n/j', $rawDate);
        $formatted = ucfirst($dt
            ? strtolower($dt->format('M j'))
            : htmlspecialchars($rawDate, ENT_QUOTES));

        $escapeAndStrong = function (string $txt) {
            $e = htmlspecialchars($txt, ENT_QUOTES);
            return preg_replace('/\*(.+?)\*/', '<strong>$1</strong>', $e);
        };

        $h = ucfirst($escapeAndStrong($rawTitle)
            . ' <span class="date">' . $formatted . '</span>');


        $content = trim($rawText);
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

        echo "<div class=\"card container separator\">\n";
        echo "  <h3 class=\"headline\">{$h}</h3>\n";
        echo "  {$output}\n";
        echo "</div>\n\n";
    }
    ?>
</div>



