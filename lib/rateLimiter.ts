const requests = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(ip: string) {
  const now = Date.now()
  const windowMs = 600000 // 10 minutes
  const limit = 20 // 20 messages per 10 minutes
  
  const userRequests = requests.get(ip)
  
  if (!userRequests || now > userRequests.resetTime) {
    // First request or window expired - reset
    requests.set(ip, { count: 1, resetTime: now + windowMs })
    return { 
      allowed: true, 
      remaining: limit - 1,
      triggerRateLimit: false 
    }
  }
  
  if (userRequests.count >= limit) {
    // Already hit limit
    return { 
      allowed: false, 
      remaining: 0, 
      resetTime: userRequests.resetTime,
      triggerRateLimit: true 
    }
  }
  
  // Increment count
  userRequests.count++
  return { 
    allowed: true, 
    remaining: limit - userRequests.count,
    triggerRateLimit: false 
  }
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [ip, data] of requests.entries()) {
    if (now > data.resetTime) {
      requests.delete(ip)
    }
  }
}, 600000) // Clean every 10 minutes