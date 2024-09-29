import json
def process_workbook(wb) -> any:
    print(wb)
    return wb
def handler(event) -> dict:
    try:
        wb = json.loads(event['body'])
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Invalid request: Expected JSON body'})
        }
    processed_wb = process_workbook(wb)
    print('Workbook JSON correctly processed')
    return {
        'statusCode': 200,
        'body': json.dumps(processed_wb)
    }