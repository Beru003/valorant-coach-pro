#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

console.log("🚀 VALORANT Coach Pro - Supabase Setup Helper\n")

// Check if .env.local exists
const envPath = path.join(process.cwd(), ".env.local")
const envExamplePath = path.join(process.cwd(), ".env.example")

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath)
    console.log("✅ Created .env.local from .env.example")
  } else {
    // Create basic .env.local
    const envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Gemini AI Configuration
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
`
    fs.writeFileSync(envPath, envContent)
    console.log("✅ Created .env.local file")
  }
} else {
  console.log("✅ .env.local already exists")
}

console.log("\n📋 Next Steps:")
console.log("1. Go to https://supabase.com and create a new project")
console.log("2. Get your Project URL and API keys from Settings > API")
console.log("3. Update your .env.local file with the real values")
console.log("4. Run the SQL scripts in Supabase SQL Editor")
console.log("5. Get your Gemini API key from https://makersuite.google.com/app/apikey")
console.log("6. Run: npm run dev")

console.log("\n🔗 Helpful Links:")
console.log("- Supabase Dashboard: https://supabase.com/dashboard")
console.log("- Google AI Studio: https://makersuite.google.com/app/apikey")
console.log("- Setup Guide: Check docs/supabase-setup-guide.md")

console.log("\n✨ Setup helper completed!")
