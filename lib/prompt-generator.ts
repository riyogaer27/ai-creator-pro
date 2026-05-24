export interface CharacterData {
  ethnicity?: string
  expression?: string
  bust?: number
  waist?: number
  hip?: number
  hairStyle?: string
  skinTone?: string
  eyeColor?: string
}

export function generateCharacterPrompt(data: CharacterData): string {
  const parts: string[] = []

  // Base description
  const ethnicityMap: Record<string, string> = {
    'Indonesian': 'Indonesian woman',
    'Korean': 'Korean woman',
    'Thai': 'Thai woman',
    'European': 'European woman',
    'African': 'African woman',
    'Indian': 'Indian woman',
  }

  const baseEthnicity = Object.entries(ethnicityMap).find(
    ([key]) => data.ethnicity?.includes(key)
  )?.[1] || 'beautiful woman'

  parts.push(baseEthnicity)

  // Expression
  const expressionMap: Record<string, string> = {
    'Confident': 'confident and strong expression',
    'Serene': 'serene and peaceful expression',
    'Playful': 'playful and joyful expression',
    'Sultry': 'sultry and mysterious expression',
  }

  const expression = Object.entries(expressionMap).find(
    ([key]) => data.expression?.includes(key)
  )?.[1]

  if (expression) parts.push(`with ${expression}`)

  // Physical features
  if (data.skinTone) parts.push(`${data.skinTone} skin`)
  if (data.eyeColor) parts.push(`${data.eyeColor} eyes`)
  if (data.hairStyle) parts.push(`${data.hairStyle} hair`)

  // Measurements context
  if (data.bust && data.waist && data.hip) {
    const waistRatio = data.bust / data.waist
    if (waistRatio > 1.3) {
      parts.push('hourglass figure')
    } else if (waistRatio > 1.1) {
      parts.push('curvy silhouette')
    } else {
      parts.push('athletic build')
    }
  }

  // Professional context
  parts.push('professional studio lighting')
  parts.push('high quality')
  parts.push('detailed')
  parts.push('realistic')
  parts.push('4k')

  return parts.filter(Boolean).join(', ')
}

export function generateMotionPrompt(motionData: {
  detectedMotions?: string[]
  keyPoints?: Record<string, { x: number; y: number }>
}): string {
  const parts: string[] = []

  // Motion descriptors
  if (motionData.detectedMotions?.length) {
    const motionText = motionData.detectedMotions
      .map((m) => m.replace(' detected', '').toLowerCase())
      .join(', ')

    parts.push(`dynamic ${motionText}`)
  }

  // Body positioning
  if (motionData.keyPoints) {
    const keyPoints = motionData.keyPoints
    const shoulderHeight = (keyPoints.shoulders?.y || 0)
    const legHeight = (keyPoints.leftLeg?.y || 0)

    if (legHeight - shoulderHeight > 0.3) {
      parts.push('standing pose')
    }

    if (Math.abs((keyPoints.leftArm?.x || 0) - (keyPoints.rightArm?.x || 0)) > 0.3) {
      parts.push('extended arm movement')
    }

    if (Math.abs((keyPoints.leftLeg?.x || 0) - (keyPoints.rightLeg?.x || 0)) > 0.15) {
      parts.push('walking motion')
    }
  }

  // Quality tags
  parts.push('smooth motion')
  parts.push('natural movement')
  parts.push('cinematic')
  parts.push('professional')

  return parts.filter(Boolean).join(', ')
}

export function optimizePrompt(prompt: string): string {
  // Remove duplicates
  const words = prompt.split(', ')
  const unique = [...new Set(words)]
  
  // Limit to 77 tokens (CLIP token limit)
  let optimized = unique.join(', ')
  if (optimized.length > 500) {
    optimized = unique.slice(0, Math.min(15, unique.length)).join(', ')
  }

  return optimized
}

export function generatePromptExplanation(): string {
  return `📝 Prompt ini akan generate image dengan:
  
  ✨ Visual style: Professional, cinematic, high-quality
  👤 Character: Sesuai ethnicity, expression, dan body measurements
  💫 Details: Skin tone, eye color, hair style
  🎨 Quality: 4K, realistic, detailed
  
  Tips untuk hasil lebih baik:
  • Tambah lebih banyak detail outfit/background
  • Spesifik dengan lighting (soft, dramatic, golden hour)
  • Mention photography style (portrait, fashion, editorial)
  `
}
