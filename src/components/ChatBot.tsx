import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'नमस्कार! मैं आपकी सरकारी योजनाओं और आवेदन प्रक्रिया में सहायता के लिए यहाँ हूँ। आप मुझसे हिंदी, अंग्रेजी या अपनी स्थानीय भाषा में पूछ सकते हैं।',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const predefinedResponses = {
    'forest rights': 'Forest Rights Act 2006 के तहत आप अपनी वन भूमि के अधिकार के लिए आवेदन कर सकते हैं। आवश्यक दस्तावेज: निवास प्रमाण पत्र, जाति प्रमाण पत्र, और भूमि कब्जा प्रमाण।',
    'pm kisan': 'PM किसान योजना के तहत आपको ₹6000 सालाना मिलते हैं। आधार कार्ड, बैंक खाता और भूमि दस्तावेज की जरूरत है।',
    'application status': 'अपना आवेदन स्टेटस चेक करने के लिए अपना एप्लिकेशन नंबर और रजिस्टर्ड मोबाइल नंबर दें।',
    'documents': 'आवश्यक दस्तावेज: 1) आधार कार्ड 2) जाति प्रमाण पत्र 3) निवास प्रमाण पत्र 4) बैंक पासबुक 5) भूमि दस्तावेज (यदि लागू हो)',
    'help': 'मैं इन सभी में आपकी मदद कर सकता हूँ:\n• योजना आवेदन\n• दस्तावेज सूची\n• आवेदन स्टेटस\n• पात्रता जांच\n• संपर्क जानकारी'
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simple AI response logic
    setTimeout(() => {
      let botResponse = 'मैं आपकी मदद करने की कोशिश कर रहा हूँ। कृपया अधिक विशिष्ट जानकारी दें या हेल्प टाइप करें।';

      const lowerInput = inputMessage.toLowerCase();
      
      for (const [key, response] of Object.entries(predefinedResponses)) {
        if (lowerInput.includes(key) || lowerInput.includes(key.replace(' ', ''))) {
          botResponse = response;
          break;
        }
      }

      // Check for Hindi keywords
      if (lowerInput.includes('योजना') || lowerInput.includes('आवेदन')) {
        botResponse = 'आप किस योजना के बारे में जानना चाहते हैं? PM किसान, वन अधिकार, जल जीवन मिशन, या छात्रवृत्ति?';
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage('');
  };

  const quickQuestions = [
    'योजना कैसे apply करें?',
    'आवेदन status check करें',
    'जरूरी documents क्या हैं?',
    'PM Kisan के बारे में बताएं'
  ];

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50"
        size="lg"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg flex items-center">
          <Bot className="w-5 h-5 mr-2 text-primary" />
          सहायक बॉट
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === 'bot' && (
                    <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  )}
                  {message.sender === 'user' && (
                    <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  )}
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Questions */}
        <div className="px-4 py-2 border-t">
          <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-1">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setInputMessage(question);
                  handleSendMessage();
                }}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="px-4 pb-4">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="अपना सवाल यहाँ लिखें..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="text-sm"
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;