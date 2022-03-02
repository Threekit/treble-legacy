import { useState } from 'react';
import {
  MailIcon,
  RemoveIcon,
  useThreekitInitStatus,
  Modal,
} from '@threekit-tools/treble';

export default function EmailShare() {
  const hasLoaded = useThreekitInitStatus();
  const [showModal, setShowModal] = useState();
  const [sendTo, setSendTo] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClickSend = async () => {
    if (sending) return;
    if (!sendTo.length) return alert('Send to email address is missing');
    setSending(true);
    await window.threekit.treble.sendEmail(
      {
        to: sendTo,
        from: 'asaeed@threekit.com',
        templateId: '27152871',
      },
      {
        logo_image: 'logo_image_Value',
        product_image: 'product_image_Value',
        price: name,
        company_name: message,
      }
    );
    setSending(false);
    setShowModal(false);
    setSendTo('');
    setName('');
    setMessage('');
  };

  if (!hasLoaded) return null;

  return (
    <>
      <button onClick={handleClick} className="trbl-wgt-btn">
        <MailIcon />
      </button>
      <Modal
        showHeader={false}
        show={showModal}
        handleClose={() => setShowModal(false)}
      >
        <div className="py-6 px-7">
          <div className="flex justify-between mb-5 text-xl">
            <div>Share via email</div>
            <div onClick={() => setShowModal(false)} className="cursor-pointer">
              <RemoveIcon />
            </div>
          </div>
          <div className="mb-4 text-gray-600">
            Send to...
            <br />
            <input
              type="text"
              placeholder="some.name@email.com"
              className="w-full px-2 py-2 mt-2 rounded-sm shadow-inner outline-0 border border-solid border-gray-400 hover:border-blue-500 focus:border-blue-500 text-gray-500 bg-white"
              value={sendTo}
              onChange={e => setSendTo(e.target.value)}
            />
          </div>
          <div className="mb-4 text-gray-600">
            Your name (optional)
            <br />
            <input
              type="text"
              placeholder="John Smith"
              className="w-full px-2 py-2 mt-2 rounded-sm shadow-inner outline-0 border border-solid border-gray-400 hover:border-blue-500 focus:border-blue-500 text-gray-500 bg-white"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mb-4 text-gray-600">
            Message (optional)
            <br />
            <textarea
              type="text"
              rows="4"
              placeholder="Hey, check this out..."
              className="w-full px-2 py-2 mt-2 rounded-sm shadow-inner outline-0 border border-solid border-gray-400 hover:border-blue-500 focus:border-blue-500 text-gray-500 bg-white"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
          <div>
            <button
              className={`w-full h-10 cursor-pointer text-lg rounded-full outline-0 border border-solid border-blue-500 text-blue-500 bg-white duration-300 hover:bg-blue-500 hover:text-white`}
              onClick={handleClickSend}
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
