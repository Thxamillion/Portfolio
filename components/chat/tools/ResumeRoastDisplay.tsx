"use client"

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, FileText, Flame, Trash2 } from 'lucide-react'
import { extractTextFromPDF } from '@/lib/pdfParser'
interface ResumeRoastDisplayProps {
  roastText?: string
  onFileUpload?: (file: File) => void
  onSendMessage?: (message: string) => void
}

export function ResumeRoastDisplay({ roastText, onFileUpload, onSendMessage }: ResumeRoastDisplayProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (file.type === 'application/pdf' || file.type === 'text/plain' || file.name.endsWith('.pdf')) {
      setUploadedFile(file)
      setIsUploading(true)
      onFileUpload?.(file)
      
      // Extract text from file and send to AI for roasting
      try {
        let resumeText = ''
        
        if (file.type === 'text/plain') {
          resumeText = await file.text()
        } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
          // Extract text from PDF
          resumeText = await extractTextFromPDF(file)
        } else {
          throw new Error('Unsupported file type. Please upload a PDF or text file.')
        }
        
        // Validate that we extracted some text
        if (!resumeText || resumeText.trim().length < 50) {
          throw new Error('Could not extract enough text from the file. Please ensure the PDF contains readable text or try a different format.')
        }
        
        // Send the resume text to the AI for roasting
        const roastPrompt = `Please roast this resume in a humorous but constructive way. Be brutally honest but also provide helpful feedback. Here's the resume content:\n\n${resumeText}`
        
        onSendMessage?.(roastPrompt)
        setShowSuccessMessage(true)
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 3000)
        
      } catch (error) {
        console.error('Error processing file:', error)
        const errorMessage = error instanceof Error ? error.message : 'Error processing file. Please try again.'
        alert(errorMessage)
      }
      
      setIsUploading(false)
    } else {
      alert('Please upload a PDF or text file')
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const clearFile = () => {
    setUploadedFile(null)
    setShowSuccessMessage(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Flame className="h-8 w-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-900">Resume Roast</h1>
          <Flame className="h-8 w-8 text-orange-500" />
        </div>
        <p className="text-gray-600 text-lg">
          Upload your resume and get a brutally honest (but helpful) roast! 🔥
        </p>
      </div>

      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Your Resume
          </CardTitle>
          <CardDescription>
            Drag and drop your resume or click to browse. Accepts PDF and text files.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : uploadedFile
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileInputChange}
              className="hidden"
            />
            
            {uploadedFile ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <FileText className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-medium text-green-700">{uploadedFile.name}</p>
                    <p className="text-sm text-green-600">
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                
                {isUploading && (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-600">Processing...</span>
                  </div>
                )}
                
                {showSuccessMessage && (
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <span className="text-sm font-medium">✅ Resume sent for roasting! Check the chat below.</span>
                  </div>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFile}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove File
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Upload className="h-12 w-12 text-gray-400" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    Drop your resume here
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    or click to browse files
                  </p>
                </div>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Choose File
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>


      {/* Tips Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Pro Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <ul className="space-y-2">
            <li>• Make sure your resume is up-to-date before uploading</li>
            <li>• The roast will be honest but constructive</li>
            <li>• PDF format usually works best for parsing</li>
            <li>• Don't take it too personally - it's all in good fun! 😄</li>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}