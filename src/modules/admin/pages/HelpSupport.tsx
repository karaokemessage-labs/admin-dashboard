import { Mail, MessageCircle, FileText, ExternalLink, HelpCircle, Phone, Globe } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const HelpSupport = () => {
  const { t } = useLanguage();

  const supportChannels = [
    {
      icon: Mail,
      title: t('pages.helpSupport.emailSupport') || 'Email Support',
      description: t('pages.helpSupport.emailSupportDesc') || 'Send us an email and we\'ll get back to you within 24 hours',
      action: 'support@kara.club',
      link: 'mailto:support@kara.club',
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
    },
    {
      icon: MessageCircle,
      title: t('pages.helpSupport.liveChat') || 'Live Chat',
      description: t('pages.helpSupport.liveChatDesc') || 'Chat with our support team in real-time',
      action: t('pages.helpSupport.startChat') || 'Start Chat',
      link: '#',
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
    },
    {
      icon: Phone,
      title: t('pages.helpSupport.phoneSupport') || 'Phone Support',
      description: t('pages.helpSupport.phoneSupportDesc') || 'Call us for immediate assistance',
      action: '+84 123 456 789',
      link: 'tel:+84123456789',
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
    },
  ];

  const faqCategories = [
    {
      title: t('pages.helpSupport.gettingStarted') || 'Getting Started',
      questions: [
        {
          q: t('pages.helpSupport.faq1Question') || 'How do I create an account?',
          a: t('pages.helpSupport.faq1Answer') || 'You can create an account by clicking on the "Register" button on the login page and filling in your information.',
        },
        {
          q: t('pages.helpSupport.faq2Question') || 'How do I reset my password?',
          a: t('pages.helpSupport.faq2Answer') || 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.',
        },
      ],
    },
    {
      title: t('pages.helpSupport.accountManagement') || 'Account Management',
      questions: [
        {
          q: t('pages.helpSupport.faq3Question') || 'How do I update my profile?',
          a: t('pages.helpSupport.faq3Answer') || 'Go to "My Profile" from the user menu and click "Edit" to update your information.',
        },
        {
          q: t('pages.helpSupport.faq4Question') || 'How do I enable 2FA?',
          a: t('pages.helpSupport.faq4Answer') || 'Go to "My Profile" > "Account Security" and follow the setup instructions for Two-Factor Authentication.',
        },
      ],
    },
  ];

  const resources = [
    {
      icon: FileText,
      title: t('pages.helpSupport.userGuide') || 'User Guide',
      description: t('pages.helpSupport.userGuideDesc') || 'Complete guide to using the admin dashboard',
      link: '#',
    },
    {
      icon: FileText,
      title: t('pages.helpSupport.apiDocumentation') || 'API Documentation',
      description: t('pages.helpSupport.apiDocumentationDesc') || 'Technical documentation for API integration',
      link: '#',
    },
    {
      icon: Globe,
      title: t('pages.helpSupport.community') || 'Community Forum',
      description: t('pages.helpSupport.communityDesc') || 'Join our community to get help and share ideas',
      link: '#',
    },
  ];

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('header.helpSupport')}</h1>
        <p className="text-gray-500 text-sm">{t('pages.helpSupport.description') || 'Get help and support for your account and services'}</p>
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {supportChannels.map((channel, index) => {
          const Icon = channel.icon;
          return (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-sm border p-6 ${channel.color} hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-white ${channel.iconColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{channel.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{channel.description}</p>
                  <a
                    href={channel.link}
                    className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    {channel.action}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-800">{t('pages.helpSupport.faq') || 'Frequently Asked Questions'}</h2>
        </div>

        <div className="space-y-6">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{category.title}</h3>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <div key={faqIndex} className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-medium text-gray-900 mb-2">{faq.q}</h4>
                    <p className="text-sm text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resources Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{t('pages.helpSupport.resources') || 'Resources'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <a
                key={index}
                href={resource.link}
                className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-purple-300 transition-colors"
              >
                <Icon className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{resource.title}</h3>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;





