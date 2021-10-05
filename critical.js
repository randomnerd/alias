const critical = require('critical');
critical.generate({
    // Inline the generated critical-path CSS
    // - true generates HTML
    // - false generates CSS
    inline: true,

    // Your base directory
    base: 'build/',

    // HTML source file
    src: 'index.html',

    // Your CSS Files (optional)
    css: [
        'src/css/*.css',
        'node_modules/semantic-ui-css/semantic.min.css'
    ],

    // Viewport width
    width: 1300,

    // Viewport height
    height: 900,

    // Output results to file
    target: 'index-critical.html',
    // target: {
    //   css: 'critical.css',
    //   html: 'index-critical.html',
    //   uncritical: 'uncritical.css',
    // },

    // Extract inlined styles from referenced stylesheets
    extract: true,

    // ignore CSS rules
    // ignore: {
    //   atrule: ['@font-face'],
    //   rule: [/some-regexp/],
    //   decl: (node, value) => /big-image\.png/.test(value),
    // },
});