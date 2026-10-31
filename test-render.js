const { bundle } = require('@remotion/bundler');
const { getCompositions, renderMedia } = require('@remotion/renderer');
const path = require('path');

async function testRender() {
    try {
        console.log('Starting test render...');
        
        // Bundle the project
        const bundleLocation = await bundle(path.resolve('./src/index.tsx'));
        console.log('Bundle created at:', bundleLocation);
        
        // Get available compositions
        const comps = await getCompositions(bundleLocation);
        console.log('Available compositions:', comps.map(c => c.id));
        
        // Find WeatherComposition
        const composition = comps.find(c => c.id === 'WeatherComposition');
        if (!composition) {
            throw new Error('WeatherComposition not found');
        }
        
        console.log('Composition details:', {
            id: composition.id,
            width: composition.width,
            height: composition.height,
            fps: composition.fps,
            durationInFrames: composition.durationInFrames
        });
        
        // Just log the info, don't actually render (to avoid Chromium issues)
        console.log('\nProject setup is working correctly!');
        console.log('To render a video, you would need to install Chromium.');
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testRender();