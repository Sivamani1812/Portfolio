# Website Enquiry Form Design

## Understanding Summary

- Remove the availability chip from the home section.
- Keep the portfolio contact form simple for general messages.
- Add an Our Service call to action that opens a dedicated website service page.
- Explain custom frontend development from scratch through domain launch without excessive content.
- Collect structured website project details only on the service page.
- Send both form types directly to the portfolio owner's WhatsApp number.
- Preserve the current visual language, GSAP behavior, and responsive layout.
- Keep the static site free from backend and sensitive-data storage requirements.

## Assumptions

- WhatsApp is the preferred enquiry destination.
- The destination number is `+91 9360452496`.
- General visitors use the main contact form and prospective website clients use the service form.
- Budget ranges can be displayed in Indian rupees.
- No enquiry data needs to be stored by the portfolio itself.

## Final Design

- Use name, email, phone, and message fields on the portfolio contact form.
- Place an Our Service call to action below the simple form.
- Link the call to action to `website-service.html`.
- Present a concise service overview, benefits, four-step process, and project application form.
- Collect business name, website type, domain status, budget, timeline, and requirements on the service page.
- Build readable WhatsApp messages from `FormData` and open them in a new tab.
- Keep both pages responsive and consistent with the portfolio design.

## Decision Log

1. Send enquiries through WhatsApp instead of `mailto:` or an external form service.
   - Reason: direct delivery, no backend, and fewer visitor setup requirements.
2. Separate general contact and website-service enquiries.
   - Reason: the portfolio form stays simple while project enquiries still arrive with useful details.
3. Do not store visitor data in the portfolio.
   - Reason: lower privacy and maintenance overhead for a static site.
4. Use a dedicated service page instead of expanding the contact section.
   - Reason: clients get a clear explanation and focused application flow without cluttering the portfolio.

## Verification

- Confirm required validation works.
- Confirm the service call to action opens the dedicated page.
- Confirm both forms create the correct WhatsApp message.
- Confirm the destination phone number and encoded message are correct.
- Confirm the layout works on desktop and mobile.
