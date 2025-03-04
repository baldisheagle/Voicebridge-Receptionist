import React, { useEffect, useState } from 'react';
import { useRequireAuth } from '../../use-require-auth.js';
import { Col, Row } from 'react-bootstrap';
import { Button, Heading, Spinner, Text, TextField } from '@radix-ui/themes';
import toast, { Toaster } from 'react-hot-toast';
import { dbUpdateAgent } from '../../utilities/database.js';

export default function Calendar({ agent }) {

  const auth = useRequireAuth();

  const [calEventTypeId, setCalEventTypeId] = useState(agent.calCom ? agent.calCom.eventId : null);
  const [calApiKey, setCalApiKey] = useState(agent.calCom ? agent.calCom.apiKey : null);
  const [loading, setLoading] = useState(true);
  const [calUpdating, setCalUpdating] = useState(false);

  useEffect(() => {
    if (auth && auth.user && auth.workspace) {
      initialize();
    }
  }, [auth]);

  // Initialize
  const initialize = async () => {
    // TODO: Get calendar integrations
    setLoading(false);
  }

  // Save cal
  // TODO: If no cal is selected, set calendar to null and update agent with message-taking prompt
  // TODO: If cal is selected, set calendar to cal and update agent with appointment-scheduling prompt
  const saveCal = async () => {
    setCalUpdating(true);
    let _agent = {
      ...agent,
      calCom: {
        eventId: calEventTypeId,
        apiKey: calApiKey
      }
    }

    try {

    // Update agent in database
    let dbRes = await dbUpdateAgent(_agent);

    if (dbRes) {
      setCalUpdating(false);
      toast.success('Cal.com settings updated');
      } else {
        toast.error('Error updating Cal.com settings');
        setCalUpdating(false);
      }

    } catch (error) {
      toast.error('Error updating Cal.com settings');
      setCalUpdating(false);
    }

  }

  if (!auth || !auth.user || !auth.workspace || loading) {
    return (
      <div style={{ width: '100%', minHeight: '100vh' }}>
        <Row style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 0, marginRight: 0, height: '80vh' }}>
          <Spinner size="2" />
        </Row>
      </div>
    )
  }

  return (
    <div style={{ width: '100%' }}>

      {/* Cal.com */}    
      <Row style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 0, marginRight: 0, marginTop: 10 }}>
        <Col xs={12} sm={12} md={11} lg={8} xl={7} style={{ padding: 10 }}>
          <Heading size="3" as='div'>Cal.com settings</Heading>
          <Text size="2" as='div' color='gray' style={{marginTop: 10}}>1. Go to your Cal.com dashboard and click on "Settings" → "API Keys"</Text>
          <Text size="2" as='div' color='gray'>2. Click "Create new API key" and copy the generated key</Text>
          <Text size="2" as='div' color='gray'>3. To find your Event Type ID, go to "Event Types" and click on the event you want to use</Text>
          <Text size="2" as='div' color='gray'>4. The ID is the number at the end of the URL (e.g. cal.com/event-types/123)</Text>
        </Col>
      </Row>

      {/* Cal.com API Key */}
      <Row style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 0, marginRight: 0, marginTop: 20 }}>
        <Col xs={12} sm={12} md={6} lg={4} xl={3} style={{ padding: 0, paddingLeft: 10, paddingRight: 10, paddingBottom: 5 }}>
          <Text size="2" weight="bold">API Key</Text>
          <Text size="1" as='div' color='gray'>The API key for your Cal.com account.</Text>
        </Col>
        <Col xs={12} sm={12} md={6} lg={5} xl={4} style={{ padding: 0, paddingLeft: 10 }}>
          <TextField.Root variant="surface" placeholder="API Key" value={calApiKey} onChange={(e) => setCalApiKey(e.target.value)} />
        </Col>
      </Row>

      {/* Cal.com Event Type ID */}
      <Row style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 0, marginRight: 0, marginTop: 30 }}>
        <Col xs={12} sm={12} md={6} lg={4} xl={3} style={{ padding: 0, paddingLeft: 10, paddingRight: 10, paddingBottom: 5 }}>
          <Text size="2" weight="bold">Event Type ID</Text>
          <Text size="1" as='div' color='gray'>The event type ID for your Cal.com account.</Text>
        </Col>
        <Col xs={12} sm={12} md={6} lg={5} xl={4} style={{ padding: 0, paddingLeft: 10 }}>
          <TextField.Root variant="surface" placeholder="Event Type ID" value={calEventTypeId} onChange={(e) => setCalEventTypeId(e.target.value)} />
        </Col>
      </Row>

      {/* Save button */}
      <Row style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 0, marginRight: 0, marginTop: 40 }}>
        <Col xs={12} sm={12} md={6} lg={4} xl={3} style={{ padding: 0, paddingLeft: 10, paddingRight: 10, paddingBottom: 5 }}>
          <Button variant="solid" onClick={saveCal} loading={calUpdating}>{calUpdating ? 'Saving...' : 'Save changes'}</Button>
        </Col>
      </Row>

      <Toaster position='top-center' toastOptions={{ className: 'toast' }} />
    </div>
  )


}

