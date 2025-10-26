import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4'>
      {/* Search */}
      <div className='hidden md:flex items-center gap-2 ring-[1.5px] ring-gray-300 rounded-full px-2'>
        <Image src="/search.png" alt='' width={14} height={14} />
        <input type="text" placeholder="Search..." className='w-[200px] p-2 bg-transparent outline-none' />
      </div>
      {/* Icons & User */}
      <div className='flex items-center gap-6 justify-end w-full'>
        <div className='flex items-center justify-center h-7 w-7 bg-white rounded-full cursor-pointer'>
          <Image src="/message.png" alt='' width={20} height={20} />
        </div>
        <div className='flex items-center justify-center h-7 w-7 bg-white rounded-full cursor-pointer relative'>
          <Image src="/announcement.png" alt='' width={20} height={20} />
          <div className='flex items-center justify-center w-5 h-5 absolute -right-3 -top-3 bg-purple-500 text-white rounded-full text-xs'>1</div>
        </div>
        <div className='flex flex-col cursor-pointer'>
          <span className='text-xs leading-3 font-medium'>Muhaddis</span>
          <span className='text-[10px] text-gray-500 text-right'>Admin</span>
        </div>
        <Image src="/avatar.png" alt='' width={32} height={32} className='rounded-full cursor-pointer' />
      </div>
    </div>
  )
}

export default Navbar