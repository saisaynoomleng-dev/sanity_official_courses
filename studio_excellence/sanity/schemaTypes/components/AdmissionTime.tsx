import { NumberInputProps, useFormValue } from "sanity";
import { Stack, Text } from '@sanity/ui';

const SUBTRACT_MINUTE = (date: string, minutes: number) => {
    return new Date(new Date(date).getTime() - minutes * 60000)
}

export const AdmissionTime = (props: NumberInputProps) => {
    const date = useFormValue(['dateAndTime']) as string || undefined;
    return (
        <Stack space={3}>
            {props.renderDefault(props)}
            {typeof props.value === 'number' && date ? (
                <Text size={1}>
                    Admission: {' '}
                    {SUBTRACT_MINUTE(date, props.value).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: 'numeric'
                    })}
                </Text>
            ) : null}
        </Stack >
    )
}