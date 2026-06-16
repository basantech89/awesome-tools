import type { Meta, StoryObj } from '@storybook/react-vite'

import {
	TypographyBlockquote,
	TypographyH1,
	TypographyH2,
	TypographyH3,
	TypographyLead,
	TypographyP
} from './typography'

const meta = {
	title: 'Components/Display/Typography',
	component: TypographyH1
} satisfies Meta<typeof TypographyH1>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<div className="flex w-[55ch] flex-col">
			<TypographyH1>Taxing Laughter: The Joke Tax Chronicles</TypographyH1>
			<TypographyLead>
				Once upon a time, in a far-off land, there was a very lazy king who
				spent all day lounging on his throne. One day, his advisors came to him
				with a problem: the kingdom was running out of money.
			</TypographyLead>
			<div className="flex flex-col">
				<TypographyH2>The King's Plan</TypographyH2>
				<TypographyP>
					The king thought long and hard, and finally came up with a brilliant
					plan: he would tax the jokes in the kingdom.
				</TypographyP>
				<TypographyBlockquote>
					&quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so
					it&apos;s only fair that they should pay for the privilege.&quot;
				</TypographyBlockquote>
				<TypographyH3>The Joke Tax</TypographyH3>
				<TypographyP>
					The king's subjects were not amused. They grumbled and complained, but
					the king was firm.
				</TypographyP>
				<TypographyP>
					As a result, people stopped telling jokes, and the kingdom fell into a
					gloom. But there was one person who refused to let the king's
					foolishness get him down: a court jester named Jokester.
				</TypographyP>
				<TypographyH3>Jokester's Revolt</TypographyH3>
				<TypographyP>
					Jokester began sneaking into the castle in the middle of the night and
					leaving jokes all over the place: under the king's pillow, in his
					soup, even in the royal toilet. The king was furious, but he couldn't
					seem to stop Jokester.
				</TypographyP>
				<TypographyP>
					And then, one day, the people of the kingdom discovered that the jokes
					left by Jokester were so funny that they couldn't help but laugh. And
					once they started laughing, they couldn't stop.
				</TypographyP>
				<TypographyH3>The People's Rebellion</TypographyH3>
				<TypographyP>
					The people of the kingdom, feeling uplifted by the laughter, started
					to tell jokes and puns again, and soon the entire kingdom was in on
					the joke.
				</TypographyP>
				<TypographyP>
					The king, seeing how much happier his subjects were, realized the
					error of his ways and repealed the joke tax. Jokester was declared a
					hero, and the kingdom lived happily ever after.
				</TypographyP>
			</div>
		</div>
	)
}
