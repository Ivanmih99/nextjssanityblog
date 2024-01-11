import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sectionCta',
  title: 'Section CTA',
  type: 'document',
  fields: [
    defineField({
      name: 'h1',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The main heading for the section (only one h1 allowed).',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'url',
          validation: (Rule) =>
            Rule.required().uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
          description: 'The URL to which the button will redirect.',
        }),
      ],
    }),
  ],
});