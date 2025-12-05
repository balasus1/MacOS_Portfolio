import WindowWrapper from '#hoc/WindowWrapper';
import {WindowControls} from '#components';
import { ArrowRight, ShieldHalf, Search, PanelLeft, ChevronLeft, ChevronRight, Share, Plus, Copy } from 'lucide-react';
import { blogPosts } from '#constants';

const Safari = () => {
  return (
    <>
    <div id='window-header'>
        <WindowControls target="safari" />
        <PanelLeft className="ml-10 icon" />
        <div className='flex items-center gap-1 ml-5'>
          <ChevronLeft className="icon" /> 
          <ChevronRight className="icon" />
        </div>
        <div className='flex-1 flex-center gap-3'>
          <ShieldHalf className="icon" />
          <div className="search">
            <Search className="icon" />
            <input type="text" placeholder="Search or type a URL" className='flex-1' />
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
    </div>
    <div className='blog'>
          <h2>My Favorite Blogs</h2>
          <div className='space-y-8'>
            {blogPosts.map(({id, image, title, date, link}) => (
              <div key={id} className='blog-post'>
                <div className="col-span-2">
                  <img
                    src={image}
                    alt={title}
                    onError={(e) => {
                      console.error('Error loading blog image:', image);
                      e.target.style.display = 'none';
                    }}
                    loading="lazy"
                  />
                </div>
                <div className="content">
                  <p className='text-xs text-gray-500'>{date}</p>
                  <h3 className='text-sm font-medium'>{title}</h3>
                  <a href={link} target='_blank' rel='noopener noreferrer' className='text-blue-600'>
                    Read more <ArrowRight className="icon-hover" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
    </>
  )
}

const SafariWindow = WindowWrapper(Safari, 'safari');
export default SafariWindow;