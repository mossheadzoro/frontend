import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const Features = () => {
  return (
    <div>
        <section className="px-6 py-16 text-center">
        <h3 className="text-3xl font-bold mb-4">Comprehensive Health Management</h3>
        <p className="text-muted-foreground mb-8">
          Our platform offers a range of features designed to help you stay informed and proactive about your health.
        </p>
        <Button className="mb-10">Explore Features</Button>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-lg mb-2">Daily AI Health Scans</h4>
              <p className="text-muted-foreground">
                Receive daily health assessments powered by advanced AI, providing insights into your vital signs and overall health status.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-lg mb-2">Detailed Report Analysis</h4>
              <p className="text-muted-foreground">
                Get in-depth analysis of your health reports, with clear explanations and personalized recommendations from our medical experts.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-lg mb-2">24/7 Medical Assistance</h4>
              <p className="text-muted-foreground">
                Access round-the-clock medical assistance from our team of professionals, ready to answer your questions and provide support.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default Features