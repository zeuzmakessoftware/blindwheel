'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface Question {
  name: string
  url: string
  videoEmbedUrl: string
}

const PLAYLIST_ID = 'PLot-Xpze53ldVwtstag2TL4HQhAnC8ATf'

const rawQuestions = [
  { name: "Two Sum", url: "https://leetcode.com/problems/two-sum/" },
  { name: "Best Time to Buy and Sell Stock", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
  { name: "Contains Duplicate", url: "https://leetcode.com/problems/contains-duplicate/" },
  { name: "Product of Array Except Self", url: "https://leetcode.com/problems/product-of-array-except-self/" },
  { name: "Maximum Subarray", url: "https://leetcode.com/problems/maximum-subarray/" },
  { name: "Maximum Product Subarray", url: "https://leetcode.com/problems/maximum-product-subarray/" },
  { name: "Find Minimum in Rotated Sorted Array", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
  { name: "Search in Rotated Sorted Array", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
  { name: "3Sum", url: "https://leetcode.com/problems/3sum/" },
  { name: "Container With Most Water", url: "https://leetcode.com/problems/container-with-most-water/" },
  { name: "Sum of Two Integers", url: "https://leetcode.com/problems/sum-of-two-integers/" },
  { name: "Number of 1 Bits", url: "https://leetcode.com/problems/number-of-1-bits/" },
  { name: "Counting Bits", url: "https://leetcode.com/problems/counting-bits/" },
  { name: "Missing Number", url: "https://leetcode.com/problems/missing-number/" },
  { name: "Reverse Bits", url: "https://leetcode.com/problems/reverse-bits/" },
  { name: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/" },
  { name: "Coin Change", url: "https://leetcode.com/problems/coin-change/" },
  { name: "Longest Increasing Subsequence", url: "https://leetcode.com/problems/longest-increasing-subsequence/" },
  { name: "Longest Common Subsequence", url: "https://leetcode.com/problems/longest-common-subsequence/" },
  { name: "Word Break", url: "https://leetcode.com/problems/word-break/" },
  { name: "Combination Sum", url: "https://leetcode.com/problems/combination-sum-iv/" },
  { name: "House Robber", url: "https://leetcode.com/problems/house-robber/" },
  { name: "House Robber II", url: "https://leetcode.com/problems/house-robber-ii/" },
  { name: "Decode Ways", url: "https://leetcode.com/problems/decode-ways/" },
  { name: "Unique Paths", url: "https://leetcode.com/problems/unique-paths/" },
  { name: "Jump Game", url: "https://leetcode.com/problems/jump-game/" },
  { name: "Clone Graph", url: "https://leetcode.com/problems/clone-graph/" },
  { name: "Course Schedule", url: "https://leetcode.com/problems/course-schedule/" },
  { name: "Pacific Atlantic Water Flow", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
  { name: "Number of Islands", url: "https://leetcode.com/problems/number-of-islands/" },
  { name: "Longest Consecutive Sequence", url: "https://leetcode.com/problems/longest-consecutive-sequence/" },
  { name: "Alien Dictionary", url: "https://leetcode.com/problems/alien-dictionary/" },
  { name: "Graph Valid Tree", url: "https://leetcode.com/problems/graph-valid-tree/" },
  { name: "Number of Connected Components in an Undirected Graph", url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/" },
  { name: "Insert Interval", url: "https://leetcode.com/problems/insert-interval/" },
  { name: "Merge Intervals", url: "https://leetcode.com/problems/merge-intervals/" },
  { name: "Non-overlapping Intervals", url: "https://leetcode.com/problems/non-overlapping-intervals/" },
  { name: "Meeting Rooms", url: "https://leetcode.com/problems/meeting-rooms/" },
  { name: "Meeting Rooms II", url: "https://leetcode.com/problems/meeting-rooms-ii/" },
  { name: "Reverse Linked List", url: "https://leetcode.com/problems/reverse-linked-list/" },
  { name: "Linked List Cycle", url: "https://leetcode.com/problems/linked-list-cycle/" },
  { name: "Merge Two Sorted Lists", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
  { name: "Merge k Sorted Lists", url: "https://leetcode.com/problems/merge-k-sorted-lists/" },
  { name: "Remove Nth Node From End of List", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
  { name: "Reorder List", url: "https://leetcode.com/problems/reorder-list/" },
  { name: "Set Matrix Zeroes", url: "https://leetcode.com/problems/set-matrix-zeroes/" },
  { name: "Spiral Matrix", url: "https://leetcode.com/problems/spiral-matrix/" },
  { name: "Rotate Image", url: "https://leetcode.com/problems/rotate-image/" },
  { name: "Word Search", url: "https://leetcode.com/problems/word-search/" },
  { name: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
  { name: "Longest Repeating Character Replacement", url: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
  { name: "Minimum Window Substring", url: "https://leetcode.com/problems/minimum-window-substring/" },
  { name: "Valid Anagram", url: "https://leetcode.com/problems/valid-anagram/" },
  { name: "Group Anagrams", url: "https://leetcode.com/problems/group-anagrams/" },
  { name: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses/" },
  { name: "Valid Palindrome", url: "https://leetcode.com/problems/valid-palindrome/" },
  { name: "Longest Palindromic Substring", url: "https://leetcode.com/problems/longest-palindromic-substring/" },
  { name: "Palindromic Substrings", url: "https://leetcode.com/problems/palindromic-substrings/" },
  { name: "Encode and Decode Strings", url: "https://leetcode.com/problems/encode-and-decode-strings/" },
  { name: "Maximum Depth of Binary Tree", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
  { name: "Same Tree", url: "https://leetcode.com/problems/same-tree/" },
  { name: "Invert/Flip Binary Tree", url: "https://leetcode.com/problems/invert-binary-tree/" },
  { name: "Binary Tree Maximum Path Sum", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
  { name: "Binary Tree Level Order Traversal", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
  { name: "Serialize and Deserialize Binary Tree", url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
  { name: "Subtree of Another Tree", url: "https://leetcode.com/problems/subtree-of-another-tree/" },
  { name: "Construct Binary Tree from Preorder and Inorder Traversal", url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
  { name: "Validate Binary Search Tree", url: "https://leetcode.com/problems/validate-binary-search-tree/" },
  { name: "Kth Smallest Element in a BST", url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
  { name: "Lowest Common Ancestor of a BST", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
  { name: "Implement Trie (Prefix Tree)", url: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
  { name: "Add and Search Word", url: "https://leetcode.com/problems/add-and-search-word-data-structure-design/" },
  { name: "Word Search II", url: "https://leetcode.com/problems/word-search-ii/" },
  { name: "Top K Frequent Elements", url: "https://leetcode.com/problems/top-k-frequent-elements/" },
  { name: "Find Median from Data Stream", url: "https://leetcode.com/problems/find-median-from-data-stream/" }
]

const questions: Question[] = rawQuestions.map((q, i) => ({
  ...q,
  videoEmbedUrl: 
    `https://www.youtube.com/embed?listType=playlist&list=${PLAYLIST_ID}&index=${i}`
}))

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotation, setRotation] = useState(0)
  const [selected, setSelected] = useState<Question | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = canvas.width
    const radius = size / 2
    const segments = questions.length
    const arc = (2 * Math.PI) / segments

    ctx.clearRect(0, 0, size, size)
    questions.forEach((q, i) => {
      const start = arc * i
      const end = start + arc
      
      const hue = (i * 360) / segments
      ctx.fillStyle = `hsl(${hue}, 80%, 65%)`

      ctx.beginPath()
      ctx.moveTo(radius, radius)
      ctx.arc(radius, radius, radius, start, end)
      ctx.fill()

      ctx.save()
      ctx.translate(radius, radius)
      ctx.rotate(start + arc / 2)
      ctx.textAlign = 'right'
      
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 10px sans-serif'
      ctx.textBaseline = 'middle'
      
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'
      ctx.shadowBlur = 2
      
      ctx.fillText(q.name, radius - 15, 0)
      ctx.restore()
    })
  }, [])

  const handleSpin = () => {
    const spin = Math.random() * 360 + 1080 
    const newRot = rotation + spin
    setRotation(newRot)
    setSelected(null)

    setTimeout(() => {
      const normalized = newRot % 360
      const pointerAngle = 270
      const landingAngle = (360 - normalized + pointerAngle) % 360
      const anglePerSegment = 360 / questions.length
      const idx = Math.floor(landingAngle / anglePerSegment)
      setSelected(questions[idx])
    }, 4000)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-10 space-y-8 bg-background text-foreground">
      <div className="relative w-80 h-80">
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          className="rounded-full"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 4s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        />
        {/* Pointer for the wheel */}
        <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-[16px] border-t-red-500" />
      </div>
      <Button onClick={handleSpin} disabled={rotation > 0 && selected === null}>
        {rotation > 0 && selected === null ? 'Spinning...' : 'Spin the Wheel'}
      </Button>
      {selected && (
        <Card className="w-80 animate-in fade-in zoom-in-95">
          <CardContent className="p-4 space-y-4">
            <p className="text-center text-lg font-semibold">
              You got:{' '}
              <a
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                {selected.name}
              </a>
            </p>
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={selected.videoEmbedUrl}
                title={`NeetCode Walkthrough: ${selected.name}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  )
}