import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the game_icons directory
const gameIconsDir = path.join(__dirname, 'game_icons');
// Path to the output file
const outputFile = path.join(__dirname, 'src', 'gameIcons.jsx');

// Function to extract SVG path data
function extractSvgPathData(svgContent) {
  try {
    // Extract viewBox
    const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 512 512";
    
    // Extract path data - focusing on the white fill path which is the icon content
    const pathMatch = svgContent.match(/<path fill="#fff" d="([^"]+)"/);
    const pathData = pathMatch ? pathMatch[1] : "";
    
    return { viewBox, pathData };
  } catch (error) {
    console.error('Error extracting SVG data:', error);
    return { viewBox: "0 0 512 512", pathData: "" };
  }
}

// Function to read SVG files from a directory
async function processGameIcons() {
  try {
    // Check if the game_icons directory exists
    if (!fs.existsSync(gameIconsDir)) {
      console.error(`Directory not found: ${gameIconsDir}`);
      return;
    }

    // Object to store all SVG path data
    const gameIcons = {};
    // Object to track filename occurrences for handling duplicates
    const filenameCounts = {};

    // Get all directories in the game_icons folder
    const directories = fs.readdirSync(gameIconsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    // Process each directory
    for (const dir of directories) {
      // Skip directories that start with a dot or are not meant to contain icons
      if (dir.startsWith('.') || ['badges'].includes(dir)) continue;

      const dirPath = path.join(gameIconsDir, dir);
      
      // Get all SVG files in the directory
      const files = fs.readdirSync(dirPath)
        .filter(file => file.endsWith('.svg'));
      
      // Process each SVG file
      for (const file of files) {
        const filePath = path.join(dirPath, file);
        const svgContent = fs.readFileSync(filePath, 'utf8');
        
        // Get the filename without extension
        const baseFilename = path.basename(file, '.svg');
        
        // Handle duplicate filenames
        let iconKey = baseFilename;
        
        // If this filename already exists, add a number suffix
        if (baseFilename in filenameCounts) {
          filenameCounts[baseFilename]++;
          iconKey = `${baseFilename}${filenameCounts[baseFilename]}`;
        } else {
          filenameCounts[baseFilename] = 1;
        }
        
        // Extract SVG data
        const { viewBox, pathData } = extractSvgPathData(svgContent);
        
        // Store the SVG data
        gameIcons[iconKey] = { viewBox, pathData, source: `${dir}/${baseFilename}` };
      }
    }

    // Create the output JavaScript file with React components
    const jsContent = `// Auto-generated file containing game icons as React components
import React from 'react';

// SVG data for all icons
const iconData = ${JSON.stringify(gameIcons, null, 2)};

// Base GameIcon component
export function GameIcon({ name, size = 24, color = 'currentColor', style = {}, className = '', ...props }) {
  const iconInfo = iconData[name];
  
  if (!iconInfo) {
    console.warn(\`Icon "\${name}" not found\`);
    return <span className={className} style={style}>Icon not found</span>;
  }
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={iconInfo.viewBox} 
      className={className}
      style={style}
      {...props}
    >
      <path fill={color} d={iconInfo.pathData} />
    </svg>
  );
}

// Export the icon data for direct access if needed
export const GameIcons = iconData;


`;

    // Write the file
    fs.writeFileSync(outputFile, jsContent);
    console.log(`Successfully created ${outputFile} with ${Object.keys(gameIcons).length} icons.`);
    
    // Log some stats about duplicates
    const duplicateCount = Object.values(filenameCounts).filter(count => count > 1).length;
    console.log(`Found ${duplicateCount} duplicate filenames that were renamed.`);
  } catch (error) {
    console.error('Error processing game icons:', error);
  }
}

// Run the function
processGameIcons();