import React from 'react'
import WindowWrapper from '#hoc/WindowWrapper';
import { techStack, dockApps } from '#constants/index';
import { Check, Flag } from 'lucide-react';
import WindowControls from '#components/WindowControls';

const Terminal = () => {
  const terminalApp = dockApps.find((app) => app.id === 'terminal');
  
  return (
    <>
    <div id='window-header'>
        <WindowControls target='terminal' />
        <h2>{terminalApp?.name}</h2>
    </div>
    <div className='techstack'>
        <p>
            <span className='font-bold'>/Volumes/Workspace/balashan-dev/portfolio% </span>
            show {terminalApp?.name.toLowerCase()}
        </p>
        <div className='label'>
            <p className='w-32'>Category</p>
            <p>Technologies</p>
        </div>
        <ul className='content'>
            {techStack.map(({ category, items}) => (
               <li key={category} className='flex items-center wrap'>
                <Check className='check' size={20} />
                <h3>{category}</h3>
                <ul>
                    {items.map((item, i) => (
                        <li key={i}>
                            {item} {i < items.length - 1 ? '|' : ''}
                        </li>
                    ))}
                </ul>
                </li>
            ))}  
        </ul>
        <div className='footnote'>
            <p className='text-black/50'>
                <Flag className='flag' fill='#C2E1D2FF' size={15} />
                Rendered in 6ms
            </p>
        </div>
    </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, 'terminal');

export default TerminalWindow;