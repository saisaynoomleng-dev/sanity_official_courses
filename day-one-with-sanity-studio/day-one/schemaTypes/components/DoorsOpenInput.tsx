import { NumberInputProps, useFormValue } from "sanity"
import { Stack, Text } from '@sanity/ui'


const subtractMinutesFromDate = (date: string, minutes: number) => {
    return new Date(new Date(date).getTime() - minutes * 60000)
}

const DoorsOpenInput = (props: NumberInputProps) => {
    const date = useFormValue(['dateAndTime']) as string | undefined;
    return (
        <Stack space={3}>
            {props.renderDefault(props)}
            {typeof props.value === 'number' && date ? (
                <Text size={1}>
                    Doors Open{' '}
                    {subtractMinutesFromDate(date, props.value).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })}
                </Text>
            ) : null}
        </Stack>

    )
}

export default DoorsOpenInput