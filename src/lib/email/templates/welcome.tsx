import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Text,
} from '@react-email/components';

interface WelcomeEmailProps {
  userName: string;
  dashboardUrl: string;
}

export const WelcomeEmail = ({ userName, dashboardUrl }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>📊 Options Academy</Heading>
          <Text style={headerText}>Learn to trade options like a pro</Text>
        </Section>
        
        <Section style={content}>
          <Text>Hey {userName}! 👋</Text>
          
          <Text>
            Welcome to <strong>Options Academy</strong> – the gamified way to master options trading!
          </Text>
          
          <Text><strong>Here's what happens next:</strong></Text>
          <ol>
            <li><strong>Start with Lesson 1:</strong> "What is a Call Option?" (5 minutes)</li>
            <li><strong>Earn XP & badges</strong> as you progress</li>
            <li><strong>Build your streak</strong> – learn daily to maximize growth</li>
          </ol>

          <Section style={goalBox}>
            <Text style={{ margin: 0 }}>
              <strong>🎯 Your Goal:</strong> Complete 10 fundamental lessons to unlock advanced strategies
            </Text>
          </Section>

          <Button href={dashboardUrl} style={button}>
            Start Your First Lesson →
          </Button>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f5f5f5',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px',
  maxWidth: '600px',
};

const header = {
  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
  color: 'white',
  padding: '40px 30px',
  borderRadius: '12px',
  textAlign: 'center' as const,
  marginBottom: '30px',
};

const h1 = {
  margin: '0 0 10px 0',
  fontSize: '32px',
};

const headerText = {
  margin: 0,
  opacity: 0.9,
};

const content = {
  padding: '0 20px',
};

const goalBox = {
  background: '#f0fdf4',
  borderLeft: '4px solid #22c55e',
  padding: '15px',
  margin: '20px 0',
  borderRadius: '4px',
};

const button = {
  display: 'inline-block',
  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
  color: 'white',
  padding: '14px 32px',
  textDecoration: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  margin: '30px 0',
};

export default WelcomeEmail;