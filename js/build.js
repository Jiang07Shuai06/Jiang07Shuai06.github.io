let minify=require("terser").minify,fs=require("fs/promises"),path=require("path"),glob=require("glob-promise"),THEME_ROOT=path.join(__dirname,"../.."),SOURCE_DIR=path.join(THEME_ROOT,"source/js"),BUILD_DIR=path.join(THEME_ROOT,"source/js/build"),IGNORE_PATTERNS=[path.join(SOURCE_DIR,"libs/**"),path.join(BUILD_DIR,"**"),path.join(SOURCE_DIR,"build.js")],minifyOptions={compress:{dead_code:!0,drop_console:!1,drop_debugger:!0,keep_classnames:!0,keep_fnames:!0},mangle:{keep_classnames:!0,keep_fnames:!0},format:{comments:!1},module:!0,sourceMap:{filename:"source-map",url:"source-map.map"}};async function ensureDirectoryExists(i){try{await fs.mkdir(i,{recursive:!0})}catch(e){if("EEXIST"!==e.code)throw new Error(`Failed to create directory ${i}: `+e.message)}}async function copyFile(i,e){try{await ensureDirectoryExists(path.dirname(e)),await fs.copyFile(i,e),console.log(`✓ Copied ${i} -> `+e)}catch(e){throw console.error(`× Error copying ${i}:`,e),e}}async function processFile(i){try{var e=await fs.readFile(i,"utf8"),o=path.relative(SOURCE_DIR,i),r=path.join(BUILD_DIR,o),a=path.dirname(r),s={...minifyOptions,sourceMap:{...minifyOptions.sourceMap,filename:path.basename(i),url:path.basename(i)+".map"}},t=await minify(e,s);await ensureDirectoryExists(a),await fs.writeFile(r,t.code),t.map&&await fs.writeFile(r+".map",t.map),console.log(`✓ Minified ${i} -> `+r)}catch(e){throw console.error(`× Error processing ${i}:`,e),e}}async function minifyJS(){try{await ensureDirectoryExists(BUILD_DIR);var e=await glob(SOURCE_DIR+"/libs/**/*.js"),i=await glob(SOURCE_DIR+"/**/*.js",{ignore:IGNORE_PATTERNS});if(0===i.length&&0===e.length)console.log("No JavaScript files found to process");else{console.log(`Found ${i.length} files to minify and ${e.length} lib files to copy...`);for(var o of e){var r=path.relative(SOURCE_DIR,o),a=path.join(BUILD_DIR,r);await copyFile(o,a)}var s,t=[];for(let e=0;e<i.length;e+=4)t.push(i.slice(e,e+4));for(s of t)await Promise.all(s.map(processFile));console.log("\n✓ All files processed successfully!")}}catch(e){console.error("× Build failed:",e),process.exit(1)}}minifyJS().catch(e=>{console.error("× Unhandled error:",e),process.exit(1)});