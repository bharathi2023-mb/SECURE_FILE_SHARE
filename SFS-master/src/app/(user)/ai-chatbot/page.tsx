"use client"
import { Metadata } from 'next';
import Image from 'next/image';

import { Sidebar } from '@/components/ui/sidebar';
import { playlists } from '@/data/playlists';
import { Button } from '@/components/ui/button';
import UserNav from '@/components/ui/usernav';
import Cookies from 'js-cookie'
import { useGetUserQuery } from '@/redux/api/usersApi';
import { useEffect, useState } from 'react';
import Chatbot from './chat/chat';

// export const metadata: Metadata = {
//   title: 'Dashboard',
//   description: 'Example music app using the components.',
// };

export default function Dashboard() {
  const user_token = Cookies.get('access_token')
  console.log("user_token", typeof(user_token))
  const dataOfUser = useGetUserQuery(user_token ? user_token : '').data?.user
  console.log("Userdata",dataOfUser)
  const [url, setUrl] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');

  useEffect(() => {
    generateQRCode("https://sfs-client-app.netlify.app/");
  },[])
  const generateQRCode = (url:any) => {
    if (!url) {
      return;
    }

    const qr = require('qr-image');
    const qr_svg = qr.imageSync(url, { type: 'png' });
    const dataUrl = `data:image/png;base64,${qr_svg.toString('base64')}`;
    setQrCodeDataUrl(dataUrl);
  };

  
  return (
    <>
      <div className=" md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full">
                  <div className="flex justify-between items-center border-b">
                    <div className="topHeadings p-5">
                      <h3 className="text-lg">Dashboard</h3>
                    </div>
                    <div className="righ-nav flex items-center px-5">
                      <Button variant="ghost">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#000000"
                          viewBox="0 0 256 256"
                        >
                          <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
                        </svg>
                      </Button>
                      <Button variant="ghost">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#000000"
                          viewBox="0 0 256 256"
                        >
                          <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
                        </svg>
                      </Button>
                      <UserNav />
                    </div>
                  </div>
                  <Chatbot/>
                  {/* <div className="coverImage bg-slate-100 h-64 relative">
                    <input></input>
                    <button>Send</button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
