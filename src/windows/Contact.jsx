import WindowWrapper from '#hoc/WindowWrapper';
import { WindowControls } from '#components';
import { socials, dockApps } from '#constants';

const Contact = () => {
  const contactApp = dockApps.find((app) => app.id === 'contact');

  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>{contactApp?.name}</h2>
      </div>
      <div className="p-6">
        <h3>Let's Connect</h3>
        <p>
          I'm always looking for new opportunities and collaborations. Feel free
          to reach out to me via the following channels.
        </p>
        <p className="text-sm text-gray-500 my-2 py-2 border-t border-gray-200">
          You can also send me an email at{' '}
          <a
            href="mailto:bala.s0027@gmail.com"
            className="text-blue-500 hover:underline"
          >
            bala.s0027@gmail.com
          </a>
        </p>
        <ul>
          {Array.isArray(socials) && socials.length > 0
            ? socials.map((social) => (
                <li
                  key={social.id}
                  className="rounded-lg p-3 w-60 hover:-translate-y-0.5 hover:scale-105 origin-center transition-all duration-300"
                  style={{ backgroundColor: social.bg }}
                >
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <img src={social.icon} alt={social.text} className="size-5" />
                    <p className="font-semibold text-sm text-white">
                      {social.text}
                    </p>
                  </a>
                </li>
              ))
            : null}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, 'contact');

export default ContactWindow;
