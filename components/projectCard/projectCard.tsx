"use client"
import type { ProjectType } from "@/lib/types"
import styles from "./projectCard.module.css"
import Image from "next/image"
import { useState } from "react"
import { Button } from "../ui/button"
import { ArrowUpRight, Github } from "lucide-react"
import Link from "next/link"

export default function ProjectCard({ projectDetails }: { projectDetails: ProjectType }) {
  const [showFooter, setShowFooter] = useState(true)
  const IMAGE_W = 300
  const IMAGE_H = 150
  return (
    <div
      className={styles.main}
      // onClick removed
    >
      <div className={styles.projectItem}>
        <div className={styles.imgContainer}>
          <Image
            alt=""
            src={projectDetails.imageUrl || "/placeholder.svg"}
            height={IMAGE_H}
            width={IMAGE_W}
            loading="lazy"
            className="rounded-md object-cover"
          />
          <div className={styles.p1}>{projectDetails.work}</div>
          <div className={projectDetails.status == "Active" ? styles.p2 : styles.devp2}>
            {projectDetails.status == "Active" ? (
              <div className={styles.activeDot} />
            ) : (
              <div className={styles.devDot} />
            )}
            {projectDetails.status}
          </div>
        </div>

        <p className="font-mono tracking-tight leading-[1.60rem] font-medium text-zinc-400">{projectDetails.description}</p>
      </div>
      <div className={`${styles.footerDiv} ${showFooter && styles.showFooter}`}>
        <div className="ml-auto flex items-center gap-2">
          {projectDetails.githubRepo && (
            <Link href={projectDetails.githubRepo} target="_blank" aria-label="Open GitHub repository">
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full">
                <Github size={18} />
              </Button>
            </Link>
          )}
          {projectDetails.liveLink && (
            <Link href={projectDetails.liveLink} target="_blank" aria-label="Open live project">
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full">
                <ArrowUpRight size={18} />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
