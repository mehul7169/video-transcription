'use client'

import {Header, Recorder} from '@/Components'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header/>
      <Recorder/>
    </main>
  )
}
