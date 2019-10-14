import React from "react";
import { Segment, Header, Image, Divider } from "semantic-ui-react";

//Raleway, 1.1em//
//redo with different layout - wireframe//

export default () => (
  <div class="the-team">
    <Segment basic className="team-member">
      <Segment basic className="team-member-summary" textAlign="right">
        <Header as="h1" class="name">
          James Colestock
          <Header.Subheader>CEO &bull; CTO</Header.Subheader>
          <Header.Subheader>
            IT Professional &bull; CTE Teacher
          </Header.Subheader>
        </Header>
      </Segment>
      <div class="team-member-details">
        <Image
          circular
          floated="right"
          fluid
          inline
          src="https://via.placeholder.com/600"
          style={{ maxWidth: "250px", marginTop: "2em" }}
        />
        <Segment basic class="background">
          <Header size="small">Background</Header>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </Segment>
        <Segment basic class="other-section">
          <Header size="small">Other Section</Header>
          <blockquote>
            "Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum."
          </blockquote>
        </Segment>
      </div>
    </Segment>
    <Divider section clearing />
    <Segment basic className="team-member">
      <Segment basic className="team-member-summary" textAlign="right">
        <Header as="h1" class="name">
          James Colestock
          <Header.Subheader>CEO &bull; CTO</Header.Subheader>
          <Header.Subheader>
            IT Professional &bull; CTE Teacher
          </Header.Subheader>
        </Header>
      </Segment>
      <div class="team-member-details">
        <Image
          circular
          floated="right"
          fluid
          inline
          src="https://via.placeholder.com/600"
          style={{ maxWidth: "250px", marginTop: "2em" }}
        />
        <Segment basic class="background">
          <Header size="small">Background</Header>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </Segment>
        <Segment basic class="other-section">
          <Header size="small">Other Section</Header>
          <blockquote>
            "Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum."
          </blockquote>
        </Segment>
      </div>
    </Segment>
    <Divider section clearing />
    <Segment basic className="team-member">
      <Segment basic className="team-member-summary" textAlign="right">
        <Header as="h1" class="name">
          James Colestock
          <Header.Subheader>CEO &bull; CTO</Header.Subheader>
          <Header.Subheader>
            IT Professional &bull; CTE Teacher
          </Header.Subheader>
        </Header>
      </Segment>
      <div class="team-member-details">
        <Image
          circular
          floated="right"
          fluid
          inline
          src="https://via.placeholder.com/600"
          style={{ maxWidth: "250px", marginTop: "2em" }}
        />
        <Segment basic class="background">
          <Header size="small">Background</Header>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </Segment>
        <Segment basic class="other-section">
          <Header size="small">Other Section</Header>
          <blockquote>
            "Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum."
          </blockquote>
        </Segment>
      </div>
    </Segment>
    <Divider section clearing />
  </div>
);
