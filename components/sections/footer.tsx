"use client";

import { motion } from "framer-motion";
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";
import SparklesText from "../ui/sparkles-text";
import { FULL_NAME } from "@/constants/names";

const socialLinks = [
  {
    name: "GitHub",
    icon: FiGithub,
    url: "https://github.com/yourusername",
    color: "hover:text-[#6e5494]",
  },
  {
    name: "Twitter",
    icon: FiTwitter,
    url: "https://twitter.com/yourusername",
    color: "hover:text-[#1DA1F2]",
  },
  {
    name: "LinkedIn",
    icon: FiLinkedin,
    url: "https://linkedin.com/in/yourusername",
    color: "hover:text-[#0A66C2]",
  },
  {
    name: "Email",
    icon: FiMail,
    url: "mailto:your@email.com",
    color: "hover:text-[#EA4335]",
  },
];

export default function Footer() {
  return (
    <footer className="py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 transition-colors ${link.color}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="w-6 h-6" />
                <span className="sr-only">{link.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-400">
            <p>
              Built with <span className="text-red-400">❤</span> using{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Next.js
              </a>{" "}
              and{" "}
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Tailwind CSS
              </a>
            </p>
            <div className="mt-2">
              {new Date().getFullYear()}{" "}
              <SparklesText
                sparklesCount={3}
                className="text-sm font-light inline"
                text={FULL_NAME}
              />
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
