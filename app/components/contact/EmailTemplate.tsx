import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export default function ContactEmail({
  name,
  email,
  phone,
  subject,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New contact message from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Form Submission</Heading>

          <Section style={section}>
            <Text style={label}>Name</Text>
            <Text style={value}>{name}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>
          </Section>

          <Hr style={hr} />

          {phone && (
            <>
              <Section style={section}>
                <Text style={label}>Phone</Text>
                <Text style={value}>{phone}</Text>
              </Section>
              <Hr style={hr} />
            </>
          )}

          <Section style={section}>
            <Text style={label}>Subject</Text>
            <Text style={value}>{subject}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>Message</Text>
            <Text style={messageStyle}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Reply directly to this email to respond to {name} at {email}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0 48px",
};

const section = {
  padding: "0 48px",
};

const label = {
  color: "#8898aa",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  margin: "0 0 4px",
};

const value = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0",
};

const messageStyle = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  padding: "0 48px",
  marginTop: "32px",
};
